from flask import Flask, jsonify, request, abort, send_from_directory
from werkzeug.utils import secure_filename
from flask_graphql import GraphQLView
from flask_cors import CORS
from database import db_session
from schema import schema
from uuid import uuid4
from schema.utils import decode
from bucket import bucket
import os

app = Flask(__name__)
# Enable cross domain fetch
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'bmp'])


def allowed_photo(extension):
    return extension in ALLOWED_EXTENSIONS


def get_extension(filename):
    if '.' not in filename:
        return None
    return filename.rsplit('.', 1)[1].lower()


@app.route('/upload', methods=['GET', 'POST'])
def upload_photo():
    if request.method == 'POST':
        # check if this is a user with valid token
        if 'Authorization' not in request.headers:
            abort(401, {'message': 'no token found'})
        if decode(request.headers.get('Authorization'))[0] is None:
            abort(401, {'message': 'invalid token'})

        # begin processing the photo

        # check if the post request has the file part
        if 'photo' not in request.files:
            abort(400, {'message': 'no photo found'})
        photo = request.files['photo']
        # if user does not select file, browser also
        # submit a empty part without filename
        if not photo or photo.filename == '':
            abort(400, {'message': 'no photo found'})

        extension = get_extension(photo.filename)
        if allowed_photo(extension):
            filename = secure_filename(str(uuid4()) + '.' + extension)

            retval = bucket.put_object(
                Key="img/" + filename, Body=photo, ACL='public-read')
            if retval:
                return jsonify({"url": filename, "success": True})
        abort(500)
    return '''
    <!doctype html>
    <title>上传照片 | 天际蓝 thehorizon.blue</title>
    <h1>上传照片</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=photo>
         <input type=submit value=Upload>
    </form>
    '''


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


# for ssl authentication
@app.route('/.well-known/acme-challenge/<token_value>')
def letsencrpyt(token_value):
    with open('.well-known/acme-challenge/{}'.format(token_value)) as f:
        answer = f.readline().strip()
    return answer

# For graphiql interface
app.add_url_rule(
    '/', view_func=GraphQLView.as_view('graphiql', schema=schema, graphiql=True))

# For Apollo Client'
app.add_url_rule('/batch',
                 view_func=GraphQLView.as_view('graphql', schema=schema, batch=True))


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == '__main__':
    app.run(port=2333, debug=True)

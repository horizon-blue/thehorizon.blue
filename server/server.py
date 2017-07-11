from flask import Flask, jsonify, request, abort
from werkzeug.utils import secure_filename
from flask_graphql import GraphQLView
from flask_cors import CORS
from database import db_session
from schema import schema
from uuid import uuid4
import platform
import os

app = Flask(__name__)
# Enable cross domain fetch
CORS(app)


# setup file directory for photo uploads
UPLOAD_FOLDER = os.path.dirname(os.path.realpath(
    __file__)) + '/photo' if platform.system() == 'Darwin' else '/home/horizon/photo'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'bmp'])


def allowed_photo(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_photo():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'photo' not in request.files:
            abort(500, {'message': 'no photo found'})
        photo = request.files['photo']
        # if user does not select file, browser also
        # submit a empty part without filename
        if photo.filename == '':
            abort(500, {'message': 'no photo found'})
        if photo and allowed_photo(photo.filename):
            filename = secure_filename(str(uuid4()))
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify({"url": filename, "success": True})
    abort(500)


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

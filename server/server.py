from flask import Flask, jsonify, request, abort
from flask_graphql import GraphQLView
from flask_cors import CORS
from database import db_session
from schema import schema
from uuid import uuid4
from flask_uploads import UploadSet, configure_uploads, IMAGES, patch_request_class
import platform
import os

app = Flask(__name__)
# Enable cross domain fetch
CORS(app)

# setup file directory for photo uploads
photo_path = os.path.dirname(os.path.realpath(
    __file__)) + '/photo' if platform.system() == 'Darwin' else '/home/horizon/photo'
app.config['UPLOADED_PHOTOS_DEST'] = photo_path
photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)
patch_request_class(app)  # set maximum file size, default is 16MB


@app.route('/upload', methods=['POST'])
def upload():
    print(request.files)
    if 'photo' in request.files:
        filename = photos.save(request.files['photo'], name=str(uuid4()) + '.')
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

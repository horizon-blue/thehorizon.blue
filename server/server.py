from flask import Flask, request
from flask_graphql import GraphQLView
from flask_cors import CORS
from database import db_session
from schema import schema
import webbrowser


app = Flask(__name__)
# Enable cross domain fetch
CORS(app)


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


@app.route('/test')
def test():
    return str(request.headers)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == '__main__':
    webbrowser.open_new_tab('http://localhost:2333/')
    app.run(port=2333, debug=True)

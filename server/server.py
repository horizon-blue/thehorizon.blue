from flask import Flask
from schema import schema
from flask_graphql import GraphQLView
from flask_cors import CORS

app = Flask(__name__)
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

# # For Apollo Client'
# app.add_url_rule('/graphql/batch',
# view_func=GraphQLView.as_view('graphql', schema=schema, batch=True))

if __name__ == '__main__':
    app.run(port=2333, debug=True)

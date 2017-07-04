import graphene
import models
from graphene_sqlalchemy import SQLAlchemyObjectType
import jwt
import datetime

secret = '***REMOVED***'


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        exclude_fields = ['password']


class Query(graphene.ObjectType):
    users = graphene.List(User)
    test = graphene.String()

    def resolve_users(self, args, context, info):
        query = User.get_query(context)  # SQLAlchemy query
        return query.all()

    def resolve_test(self, args, context, info):
        return 'HorizonBlue'


def get_tomorrow():
    return datetime.datetime.combine(datetime.date.today() + datetime.timedelta(days=1), datetime.datetime.min.time())


class CreateToken(graphene.Mutation):
    class Input:
        username = graphene.String()
        password = graphene.String()

    success = graphene.Boolean()
    token = graphene.String()

    @staticmethod
    def mutate(root, args, context, info):
        username = args.get('username')
        password = args.get('password')
        user = User.get_query(context).filter_by(username=username).first()
        if(user and user.password == password):
            token = jwt.encode({'username': username, 'exp': get_tomorrow()},
                               secret, algorithm='HS256').decode()
            return CreateToken(token=token, success=True)
        return CreateToken(token=None, success=False)


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

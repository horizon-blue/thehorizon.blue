import graphene
import models
from graphene_sqlalchemy import SQLAlchemyObjectType


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

schema = graphene.Schema(query=Query)

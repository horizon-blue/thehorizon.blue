import graphene
from .User import User
from .CreateToken import CreateToken


class Query(graphene.ObjectType):
    users = graphene.List(User)
    test = graphene.String()

    def resolve_users(self, args, context, info):
        query = User.get_query(context)  # SQLAlchemy query
        return query.all()

    def resolve_test(self, args, context, info):
        return 'HorizonBlue'


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

__all__ = ['schema']

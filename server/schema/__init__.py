import graphene
from .objectTypes import *
from .CreateToken import CreateToken


class Query(graphene.ObjectType):
    users = graphene.List(User)
    test = graphene.String()
    posts = graphene.List(Post)
    # context = graphene.String()

    def resolve_users(self, args, context, info):
        query = User.get_query(context)  # SQLAlchemy query
        return query.all()

    def resolve_test(self, args, context, info):
        return 'HorizonBlue'

    def resolve_posts(self, args, context, info):
        query = Post.get_query(context)  # SQLAlchemy query
        return query.all()

    # def resolve_context(self, args, context, info):
    #     # for debug purpose only
    #     return str(context.headers.get('authorization'))


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

__all__ = ['schema']

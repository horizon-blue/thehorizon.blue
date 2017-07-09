import graphene
from .objectTypes import *
from .CreateToken import CreateToken
from .utils import decode


class Query(graphene.ObjectType):
    users = graphene.List(User)
    test = graphene.String()
    posts = graphene.List(Post)
    tags = graphene.List(Tag)
    categories = graphene.List(Category)
    comments = graphene.List(Comment)
    groups = graphene.List(Group)

    def resolve_users(self, args, context, info):
        return User.get_all()

    def resolve_test(self, args, context, info):
        return 'HorizonBlue'

    def resolve_posts(self, args, context, info):
        return Post.get_all()

    def resolve_tags(self, args, context, info):
        return Tag.get_all()

    def resolve_categories(self, args, context, info):
        return Category.get_all()

    def resolve_comments(self, args, context, info):
        return Comment.get_all()

    def resolve_groups(self, args, context, info):
        return Group.get_all()


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()
    sessionIsValid = graphene.Boolean()

    def resolve_sessionIsValid(self, args, context, info):
        # for debug purpose only
        token = context.headers.get('Authorization')
        if decode(token)[0] is not None:
            return True
        else:
            return False


schema = graphene.Schema(query=Query, mutation=Mutation)

__all__ = ['schema']

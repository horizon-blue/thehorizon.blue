import graphene
from .objectTypes import *
from .CreateToken import CreateToken


class Query(graphene.ObjectType):
    users = graphene.List(User)
    test = graphene.String()
    posts = graphene.List(Post)
    tags = graphene.List(Tag)
    categories = graphene.List(Category)
    comments = graphene.List(Comment)
    groups = graphene.List(Group)
    # context = graphene.String()

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

    # def resolve_context(self, args, context, info):
    #     # for debug purpose only
    #     return str(context.headers.get('authorization'))


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

__all__ = ['schema']

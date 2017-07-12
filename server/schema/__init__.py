import graphene
from .objectTypes import *
from .CreateToken import CreateToken
from .UpdateUserInfo import UpdateUserInfo
from .CreateNewPost import CreateNewPost
from .utils import decode, is_admin


class Query(graphene.ObjectType):
    users = graphene.List(User)
    posts = graphene.List(Post)
    tags = graphene.List(Tag)
    categories = graphene.List(Category)
    groups = graphene.List(Group)

    # get info by argument
    user = graphene.Field(User, id=graphene.Argument(
        graphene.Int), name=graphene.Argument(graphene.String))

    def resolve_users(self, args, context, info):
        # must have admin privilege to view all users
        token = context.headers.get('Authorization')
        if is_admin(decode(token)[0]):
            return User.get_all()
        return None

    def resolve_posts(self, args, context, info):
        return Post.get_all()

    def resolve_tags(self, args, context, info):
        return Tag.get_all()

    def resolve_categories(self, args, context, info):
        return Category.get_all()

    def resolve_groups(self, args, context, info):
        # must have admin privilege to view all groups
        token = context.headers.get('Authorization')
        if is_admin(decode(token)[0]):
            return Group.get_all()
        return None

    def resolve_user(self, args, context, info):
        userId = args['id'] if 'id' in args else None
        name = args['name'] if 'name' in args else None
        if name is None:
            if userId is None:
                decoded = decode(context.headers.get('Authorization'))[0]
                if decoded is None:
                    return None
                userId = decoded['sub']
            user = User.get_query(context).get(userId)
            return user if not user.deleted else None  # don't send deleted user info
        else:
            return User.get_query(context).filter_by(**args, deleted=False).first()


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()
    sessionIsValid = graphene.Boolean()
    UpdateUserInfo = UpdateUserInfo.Field()
    CreateNewPost = CreateNewPost.Field()

    def resolve_sessionIsValid(self, args, context, info):
        # for debug purpose only
        token = context.headers.get('Authorization')
        if decode(token)[0] is not None:
            return True
        return False


schema = graphene.Schema(query=Query, mutation=Mutation)

__all__ = ['schema']

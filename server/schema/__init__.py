import graphene
from .objectTypes import *
from .CreateToken import CreateToken
from .UpdateUserInfo import UpdateUserInfo
from .CreateNewPost import CreateNewPost
from .CreateInvitation import CreateInvitation
from .CreateNewUser import CreateNewUser
from .UpdatePostInfo import UpdatePostInfo
from .CreateNewComment import CreateNewComment
from .utils import decode, is_admin, extract_link_info, PUBLIC_VISIBILITY_ID, GUEST_GROUP_ID, RESTRICTED_VISIBILITY_ID


class Query(graphene.ObjectType):
    users = graphene.List(User)
    posts = graphene.List(Post)
    tags = graphene.List(Tag)
    categories = graphene.List(Category)
    groups = graphene.List(Group)
    sessionIsValid = graphene.Boolean()
    invitationIsValid = graphene.Boolean(
        link=graphene.Argument(graphene.String))
    usernameIsAvailable = graphene.Boolean(
        name=graphene.Argument(graphene.String))

    # get info by argument
    user = graphene.Field(User, id=graphene.Argument(
        graphene.Int), name=graphene.Argument(graphene.String))
    post = graphene.Field(Post, link=graphene.Argument(graphene.NonNull(
        graphene.String)), category=graphene.Argument(graphene.String))
    comments = graphene.Field(graphene.List(Comment), postId=graphene.Argument(graphene.Int),
                              commentId=graphene.Argument(graphene.Int))

    def resolve_users(self, args, context, info):
        # must have admin privilege to view all users
        token = context.headers.get('Authorization')
        if is_admin(decode(token)[0]):
            return User.get_all()
        return None

    def resolve_posts(self, args, context, info):
        return Post.get_all(context)

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

    def resolve_post(self, args, context, info):
        if "category" not in args:
            post = Post.get_query(context).filter_by(
                link=args['link'], deleted=False).first()
        else:
            cate = Category.get_query(context).filter_by(
                name=args['category']).first()
            post = Post.get_query(context).filter_by(
                link=args['link'], category=cate, deleted=False).first()
        if post is None or post.visibilityId == PUBLIC_VISIBILITY_ID:
            return post
        decoded = decode(context.headers.get('Authorization'))[0]
        if decoded is None:
            return None
        groupId = decoded['groupId']
        if post.visibilityId == RESTRICTED_VISIBILITY_ID and groupId != GUEST_GROUP_ID:
            return post
        userId = decoded['sub']
        return post if userId == post.authorId else None

    def resolve_invitationIsValid(self, args, context, info):
        # for debug purpose only
        link = args.get('link')
        if extract_link_info(link)[0] is not None:
            return True
        return False

    def resolve_usernameIsAvailable(self, args, context, info):
        # for debug purpose only
        name = args.get('name')
        return User.get_query(context).filter_by(name=name).count() == 0

    def resolve_comments(self, args, context, info):
        if 'postId' not in args and 'commentId' not in args:
            return Comment.get_all()
        if 'postId' in args:
            post = Post.get_query(context).get(args.get('postId'))
            if post is not None:
                return post.comments
        elif 'commentId' in args:
            comment = Comment.get_query(context).get(args.get('commentId'))
            if comment is not None:
                return comment.subComments
        return None

    def resolve_sessionIsValid(self, args, context, info):
        # for debug purpose only
        token = context.headers.get('Authorization')
        if decode(token)[0] is not None:
            return True
        return False


class Mutation(graphene.ObjectType):
    create_token = CreateToken.Field()
    UpdateUserInfo = UpdateUserInfo.Field()
    CreateNewPost = CreateNewPost.Field()
    CreateInvitation = CreateInvitation.Field()
    CreateNewUser = CreateNewUser.Field()
    UpdatePostInfo = UpdatePostInfo.Field()
    CreateNewComment = CreateNewComment.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

__all__ = ['schema']

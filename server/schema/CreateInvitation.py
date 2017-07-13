import graphene
import jwt
from .objectTypes import User
from .utils import invitation_secret, decode, is_admin, ADMIN_GROUP_ID, GUEST_GROUP_ID, get_tomorrow, get_now


class CreateInvitation(graphene.Mutation):
    class Input:
        email = graphene.NonNull(graphene.String)
        groupId = graphene.Int()

    success = graphene.Boolean()
    link = graphene.String()

    @staticmethod
    def mutate(root, args, context, info):
        # only admin is allow to generate invitation link
        decoded = decode(context.headers.get('Authorization'))[0]
        if decoded is None or not(is_admin(decoded)):
            return CreateInvitation(success=False, link=None)

        email = args.get('email')

        # check if user already existed
        user = User.get_query(context).filter_by(email=email).first()
        if user is not None:
            return CreateInvitation(link=None, success=False)
        groupId = args.get('groupId') if 'groupId' in args and args.get(
            'groupId') != ADMIN_GROUP_ID else GUEST_GROUP_ID

        link = jwt.encode({
            'exp': get_tomorrow(),
            'iat': get_now(),
            'email': email,
            'groupId': groupId
        }, invitation_secret, algorithm='HS256').decode()
        return CreateInvitation(link=link, success=True)

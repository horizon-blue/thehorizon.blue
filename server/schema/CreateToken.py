import graphene
import jwt
from .objectTypes import User
from .utils import secret, get_tomorrow, get_now


def generate_token(user):
    return jwt.encode({
        'sub': user.id,
        'exp': get_tomorrow(),
        'iat': get_now(),
        'name': user.name,
        'groupId': user.groupId
    },
        secret, algorithm='HS256').decode()


class CreateToken(graphene.Mutation):
    class Input:
        name = graphene.NonNull(graphene.String)
        password = graphene.NonNull(graphene.String)

    success = graphene.Boolean()
    token = graphene.String()

    @staticmethod
    def mutate(root, args, context, info):
        name = args.get('name')
        password = args.get('password')
        user = User.get_query(context).filter_by(name=name).first()
        if(user and user.password == password):
            token = generate_token(user)
            return CreateToken(token=token, success=True)
        return CreateToken(token=None, success=False)

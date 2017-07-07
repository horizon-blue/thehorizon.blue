import graphene
import jwt
import datetime
from .objectTypes import User
from .utils import secret


def get_tomorrow():
    return datetime.datetime.combine(datetime.date.today() + datetime.timedelta(days=1), datetime.datetime.min.time())


class CreateToken(graphene.Mutation):
    class Input:
        name = graphene.String()
        password = graphene.String()

    success = graphene.Boolean()
    token = graphene.String()

    @staticmethod
    def mutate(root, args, context, info):
        name = args.get('name')
        password = args.get('password')
        user = User.get_query(context).filter_by(name=name).first()
        if(user and user.password == password):
            token = jwt.encode({
                'sub': user.id,
                'exp': get_tomorrow(),
                'iat': datetime.datetime.utcnow(),
                'name': user.name,
                'groupId': user.groupId
            },
                secret, algorithm='HS256').decode()
            return CreateToken(token=token, success=True)
        return CreateToken(token=None, success=False)

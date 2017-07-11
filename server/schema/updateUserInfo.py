import graphene
from database import db_session
from .objectTypes import User
from .utils import decode


class updateUserInfo(graphene.Mutation):
    class Input:
        name = graphene.String()
        password = graphene.String()
        avatar = graphene.String()
        biography = graphene.String()

    success = graphene.Boolean()

    @staticmethod
    def mutate(root, args, context, info):
        decoded = decode(context.headers.get('Authorization'))[0]
        if decoded is None:
            return updateUserInfo(success=False)
        userId = decoded['sub']
        user = User.get_query(context).get(userId)

        try:
            for key, value in args.items():
                setattr(user, key, value)
            db_session.commit()
            return updateUserInfo(success=True)
        except:
            return updateUserInfo(success=False)

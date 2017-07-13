import graphene
from models import User, Group
from database import db_session
from sqlalchemy import or_
from .utils import GUEST_GROUP_ID, extract_link_info
from .CreateToken import generate_token


class CreateNewUser(graphene.Mutation):
    class Input:
        link = graphene.NonNull(graphene.String)
        password = graphene.NonNull(graphene.String)
        name = graphene.NonNull(graphene.String)

    success = graphene.Boolean()
    token = graphene.String()

    @staticmethod
    def mutate(root, args, context, info):
        email, groupId = extract_link_info(args.get('link'))
        if email is None:
            return CreateNewUser(success=False, token=None)

        name = args.get('name')
        password = args.get('password')

        # see if no user with given name or email exist
        prev_user = User.query.filter(
            or_(User.name == name, User.email == email)).first()
        if prev_user is not None:
            return CreateNewUser(success=False, token=None)

        # make sure the group exist
        if groupId is None or Group.query.get(groupId) is None:
            groupId = GUEST_GROUP_ID

        # create a new user
        user = User(name=name, email=email, password=password, groupId=groupId)
        db_session.add(user)
        db_session.commit()

        # get the token for user
        token = generate_token(user)
        return CreateNewUser(token=token, success=True)

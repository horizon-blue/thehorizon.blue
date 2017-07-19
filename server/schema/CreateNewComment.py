import graphene
from models import Comment
from database import db_session
from .utils import decode


class CreateNewComment(graphene.Mutation):
    class Input:
        postId = graphene.Int()
        parentId = graphene.Int()
        content = graphene.NonNull(graphene.String)

    success = graphene.Boolean()

    @staticmethod
    def mutate(root, args, context, info):
        if 'postId' not in args and 'parentId' not in args:
            return CreateNewComment(success=False)

        # validate user info
        decoded = decode(context.headers.get('Authorization'))[0]
        if decoded is None:
            return CreateNewComment(success=False)
        authorId = decoded.get('sub')

        postId = args.get('postId')
        parentId = args.get('parentId')

        # a comment can only belongs to a post or a parent comment, but
        # not both
        if postId is not None and parentId is not None:
            postId = None

        c = Comment(authorId=authorId, postId=postId,
                    parentId=parentId, content=args.get('content'))

        db_session.add(c)
        db_session.commit()

        return CreateNewComment(success=True)

import graphene
from database import db_session
from models import Post, Tag, Category
import datetime
from .utils import decode, is_admin
from shortuuid import uuid

# for visibility
# 1 = public
# 2 = archive
# 3 = private
# 4 = draft


class UpdatePostInfo(graphene.Mutation):
    class Input:
        postId = graphene.NonNull(graphene.Int)
        title = graphene.NonNull(graphene.String)
        content = graphene.NonNull(graphene.String)
        excerpt = graphene.NonNull(graphene.String)
        tags = graphene.List(graphene.String)
        category = graphene.NonNull(graphene.String)
        link = graphene.String()
        visibilityId = graphene.Int()

    success = graphene.Boolean()
    link = graphene.String()

    @staticmethod
    def mutate(root, args, context, info):
        decoded = decode(context.headers.get('Authorization'))[0]
        if decoded is None or not(is_admin(decoded)):
            return UpdatePostInfo(success=False, link=None)
        post = Post.query.get(args.get('postId'))
        if post is None or post.author is None or decoded.get('sub') != post.author.id:
            return UpdatePostInfo(success=False, link=None)

        # begin creating the post
        try:
            post.title = args.get('title')
            post.excerpt = args.get('excerpt')
            post.content = args.get('content')
            post.visibilityId = args.get(
                'visibilityId') if 'visibilityId' in args else 1

            # resolve category
            if args.get('category') != post.category.name:
                category = Category.query.filter_by(
                    name=args.get('category')).first()
                if category:
                    post.category = category

            link = None
            if 'link' in args:
                link = args['link']
            if link is None or link == '':
                link = args['title'].replace(' ', '-')
            if post.link != link:
                # check if new link create a conflict
                pre_post_num = Post.query.filter_by(
                    link=link, category=post.category).count()
                if(pre_post_num):
                    link += '-{}'.format(uuid())
                post.link = link

            # resolve tags
            tags = args['tags'] if 'tags' in args else []
            # remove tags that are deleted
            existed_tags = list(post.tags)
            for tag in existed_tags:
                if tag.name in tags:
                    # skip it for next action
                    tags[tags.index(tag.name)] = None
                else:
                    # remove it
                    post.tags.remove(tag)
            for tag in tags:
                if tag is None:
                    continue
                t = Tag.query.filter_by(name=tag).first()
                if t is None:
                    t = Tag(name=tag)  # create new tag if none exist
                post.tags.append(t)
            # update the updateDate
            post.updateDate = datetime.datetime.utcnow()

            # save the updated post to database
            db_session.commit()
            return UpdatePostInfo(success=True, link=post.link)

        except Exception as e:
            print(str(e))
            return UpdatePostInfo(success=False, link=None)

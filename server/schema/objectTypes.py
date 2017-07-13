import models
from graphene_sqlalchemy import SQLAlchemyObjectType
from bs4 import BeautifulSoup
from .utils import Utils


class User(Utils, SQLAlchemyObjectType):
    class Meta:
        model = models.User
        exclude_fields = ['password', 'deleted', 'groupId']


class Post(Utils, SQLAlchemyObjectType):
    class Meta:
        model = models.Post
        exclude_fields = ['deleted', 'authorId', 'categoryId']

    def resolve_excerpt(self, args, context, info):
        # return first 160 of content in case excerpt is empty
        if self.excerpt is None or self.excerpt == '':
            # use beautifulsoup to make sure the html line is complete
            return BeautifulSoup(self.content[:160], 'html.parser')
        return self.excerpt

    @classmethod
    def get_all(cls):
        return cls._meta.model.query.filter_by(deleted=False).order_by(cls._meta.model.publishDate.desc()).all()


class Comment(Utils, SQLAlchemyObjectType):
    class Meta:
        model = models.Comment
        exclude_fields = ['deleted', 'authorId', 'postId', 'parentId']


class Tag(Utils, SQLAlchemyObjectType):
    class Meta:
        model = models.Tag
        exclude_fields = ['deleted']


class Category(Utils, SQLAlchemyObjectType):
    class Meta:
        model = models.Category
        exclude_fields = ['deleted']


class Group(Utils, SQLAlchemyObjectType):
    class Meta:
        model = models.Group
        exclude_fields = ['deleted']

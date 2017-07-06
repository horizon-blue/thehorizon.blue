import models
from graphene_sqlalchemy import SQLAlchemyObjectType


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        exclude_fields = ['password', 'deleted']


class Post(SQLAlchemyObjectType):
    class Meta:
        model = models.Post
        exclude_fields = ['deleted']


class Comment(SQLAlchemyObjectType):
    class Meta:
        model = models.Comment
        exclude_fields = ['deleted']


class Tag(SQLAlchemyObjectType):
    class Meta:
        model = models.Tag
        exclude_fields = ['deleted']


class Category(SQLAlchemyObjectType):
    class Meta:
        model = models.Category
        exclude_fields = ['deleted']


class Group(SQLAlchemyObjectType):
    class Meta:
        model = models.Group
        exclude_fields = ['deleted']

import models
from graphene_sqlalchemy import SQLAlchemyObjectType


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        exclude_fields = ['password']

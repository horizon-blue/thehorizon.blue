from sqlalchemy import Column, Integer, Text
from database import Base
from .utils import HasPassword


class User(HasPassword, Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(Text, nullable=False)

    def __repr__(self):
        return '<User %r>' % (self.username)

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    last_name = Column(String)

    def __init__(self, name=None, last_name=None):
        self.name = name
        self.last_name = last_name

    def __repr__(self):
        return '<User %r>' % (self.name)

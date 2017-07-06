from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import relationship
from database import Base
from .utils import HasPassword


class User(HasPassword, Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(Text, nullable=False)

    # relationships
    posts = relationship("Post", back_populates="author")

    def __repr__(self):
        return '<User %r>' % (self.username)

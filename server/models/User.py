import datetime
from sqlalchemy import Column, Integer, Text, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates
from database import Base
from .utils import HasPassword


class User(HasPassword, Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    joinDate = Column(DateTime, default=datetime.datetime.utcnow)

    # other personal info
    email = Column(String)
    biography = Column(Text)
    avatar = Column(String)  # just save the path

    # relationships
    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    groupId = Column(Integer, ForeignKey('group.id'))
    group = relationship("Group", back_populates="members")

    # hopefully this will never beused
    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<User %r>' % (self.name)

    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address
        return address

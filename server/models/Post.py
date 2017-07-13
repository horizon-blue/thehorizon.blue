import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime, Boolean
from database import Base
from .Tag import tagIdentifier


def default_link(context):
    return context.current_parameters.get('title').replace(' ', '-')


class Post(Base):
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True)
    createDate = Column(DateTime, default=datetime.datetime.utcnow)
    publishDate = Column(DateTime, default=datetime.datetime.utcnow)
    updateDate = Column(DateTime, default=datetime.datetime.utcnow)

    # content
    link = Column(Text, default=default_link)
    title = Column(Text, nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)

    # relationships
    authorId = Column(Integer, ForeignKey('user.id'))
    author = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    tags = relationship(
        "Tag", secondary=tagIdentifier, back_populates="posts")
    categoryId = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category", back_populates="posts")
    visibilityId = Column(Integer, ForeignKey('visibility.id'))
    visibility = relationship("Visibility", back_populates="posts")

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Post %r by %r at %r>' % (self.title, self.author, self.createDate)

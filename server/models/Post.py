import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime, Boolean
from database import Base
from .Tag import tag_identifier


class Post(Base):
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True)
    create_date = Column(DateTime, default=datetime.datetime.utcnow)
    publish_date = Column(DateTime, default=datetime.datetime.utcnow)
    update_date = Column(DateTime, default=datetime.datetime.utcnow)

    # content
    title = Column(Text, nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)

    # relationships
    author_id = Column(Integer, ForeignKey('user.id'))
    author = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    tags = relationship(
        "Tag", secondary=tag_identifier, back_populates="posts")
    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category", back_populates="posts")

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Post %r by %r at %r>' % (self.title, self.author, self.create_date)

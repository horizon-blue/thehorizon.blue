import datetime
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime, Boolean
from database import Base


class Comment(Base):
    __tablename__ = 'comment'
    id = Column(Integer, primary_key=True)
    createDate = Column(DateTime, default=datetime.datetime.utcnow)

    # content
    content = Column(Text, nullable=False)

    # relationships
    authorId = Column(Integer, ForeignKey('user.id'))
    author = relationship("User", back_populates="comments")
    postId = Column(Integer, ForeignKey('post.id'))
    post = relationship("Post", back_populates="comments")

    # Adjacency List Relationships (for subcomment)
    parentId = Column(Integer, ForeignKey('comment.id'))
    sub_comments = relationship("Comment",
                                backref=backref('parent', remote_side=[id])
                                )

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Comment %r by %r on %r >' % (self.content, self.author, self.post)

import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from database import Base


class Post(Base):
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True)
    title = Column(Text, nullable=False)
    create_date = Column(DateTime, default=datetime.datetime.utcnow)

    # relationships
    author_id = Column(Integer, ForeignKey('user.id'))
    author = relationship("User", back_populates="posts")

    def __repr__(self):
        return '<Post %r by %s at %s>' % (self.title, self.author.username, self.create_date)

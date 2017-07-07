from sqlalchemy import Column, Integer, Text, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from database import Base

# many to many relationship
tagIdentifier = Table('tagIdentifier', Base.metadata,
                      Column('postId', Integer, ForeignKey('post.id')),
                      Column('tagId', Integer, ForeignKey('tag.id'))
                      )


class Tag(Base):
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    posts = relationship(
        "Post", secondary=tagIdentifier, back_populates="tags")

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Tag %r>' % (self.name)

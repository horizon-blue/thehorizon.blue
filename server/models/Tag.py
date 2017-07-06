from sqlalchemy import Column, Integer, Text, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from database import Base

# many to many relationship
tag_identifier = Table('tag_identifier', Base.metadata,
                       Column('post_id', Integer, ForeignKey('post.id')),
                       Column('tag_id', Integer, ForeignKey('tag.id'))
                       )


class Tag(Base):
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    posts = relationship(
        "Post", secondary=tag_identifier, back_populates="tags")

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Tag %r>' % (self.name)

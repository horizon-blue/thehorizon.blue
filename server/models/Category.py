from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, Text, Boolean
from database import Base


class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    posts = relationship("Post", back_populates="category")

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Category %r>' % (self.name)

from sqlalchemy import Column, Integer, Text, Boolean
from sqlalchemy.orm import relationship
from database import Base


class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    members = relationship("User", back_populates="group")
    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Group %r>' % (self.name)

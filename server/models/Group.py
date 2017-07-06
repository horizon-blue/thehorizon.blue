from sqlalchemy import Column, Integer, Text, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from database import Base

# many to many relationship
group_identifier = Table('group_identifier', Base.metadata,
                         Column('user_id', Integer, ForeignKey('user.id')),
                         Column('group_id', Integer, ForeignKey('group.id'))
                         )


class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    members = relationship(
        "User", secondary=group_identifier, back_populates="groups")
    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Group %r>' % (self.name)

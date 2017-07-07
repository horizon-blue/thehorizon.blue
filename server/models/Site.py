from sqlalchemy import Column, Integer, Text, Boolean, String
from database import Base


class Tab(Base):
    __tablename__ = 'tab'
    id = Column(Integer, primary_key=True)
    link = Column(String, nullable=False, unique=True)
    name = Column(Text, nullable=False)
    description = Column(Text)

    deleted = Column(Boolean, default=False)

    def __repr__(self):
        return '<Tab %r>' % (self.name)

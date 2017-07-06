from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
import os

# get the absolute path of current directory
dir_path = os.path.dirname(os.path.realpath(__file__))

engine = create_engine(
    'sqlite:///{}/db.sqlite3'.format(dir_path), convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


# for quick setup
def init_db():
    import models
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

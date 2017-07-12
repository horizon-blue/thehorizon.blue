import jwt
import re


secret = '***REMOVED***'


class Utils:
    @classmethod
    def get_all(cls):
        return cls._meta.model.query.filter_by(deleted=False).all()


def decode(token):
    if(token is None or type(token) != str or token[:7] != 'Bearer '):
        return None, 'fail'
    try:
        return jwt.decode(token[7:], secret, algorithms=['HS256']), 'success'
    except jwt.exceptions.ExpiredSignatureError:
        return None, 'expired'
    except:
        return None, 'fail'


def is_admin(decoded):
    return decoded is not None and decoded["groupId"] == 1


cleanr = re.compile('<.*?>')


def cleanhtml(raw_html):
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext

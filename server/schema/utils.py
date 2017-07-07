import jwt

secret = '***REMOVED***'


class Utils:
    @classmethod
    def get_all(cls):
        return cls._meta.model.query.filter(cls._meta.model.deleted != True).all()


def decode(token):
    if(token is None or type(token) != str or token[:7] != 'Bearer '):
        return None, 'fail'
    try:
        return jwt.decode(token[7:], secret, algorithms=['HS256']), 'success'
    except jwt.exceptions.ExpiredSignatureError:
        return None, 'expired'
    except:
        return None, 'fail'

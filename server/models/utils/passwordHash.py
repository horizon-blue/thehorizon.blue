import bcrypt
from sqlalchemy.ext.mutable import Mutable


class PasswordHash(Mutable):
    def __init__(self, hash_, rounds=None):
        hash_cpy = hash_.decode() if isinstance(hash_, (bytes, bytearray)) else hash_
        assert len(hash_cpy) == 60, 'bcrypt hash should be 60 chars.'
        assert hash_cpy.count('$'), 'bcrypt hash should have 3x "$".'
        self.hash = hash_
        self.rounds = int(hash_cpy.split('$')[2])
        self.desired_rounds = rounds or self.rounds

    def __eq__(self, candidate):
        """Hashes the candidate string and compares it to the stored hash.

        If the current and desired number of rounds differ, the password is
        re-hashed with the desired number of rounds and updated with the results.
        This will also mark the object as having changed (and thus need updating).
        """
        if isinstance(candidate, str):
            if bcrypt.checkpw(candidate.encode('utf8'), self.hash):
                if self.rounds < self.desired_rounds:
                    self._rehash(candidate)
                return True
        return False

    def __repr__(self):
        """Simple object representation."""
        return '<{}>'.format(type(self).__name__)

    @classmethod
    def new(cls, password, rounds):
        """Creates a PasswordHash from the given password."""
        if isinstance(password, str):
            password = password.encode('utf8')
        return cls(bcrypt.hashpw(password, bcrypt.gensalt(rounds)))

    @staticmethod
    def _new(password, rounds):
        """Returns a new bcrypt hash for the given password and rounds."""
        return bcrypt.hashpw(password, bcrypt.gensalt(rounds))

    def _rehash(self, password):
        """Recreates the internal hash and marks the object as changed."""
        self.hash = self._new(password, self.desired_rounds)
        self.rounds = self.desired_rounds
        self.changed()

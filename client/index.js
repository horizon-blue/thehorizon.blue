'use strict';
import app from './app';

const PORT = process.env.PORT || 12345;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

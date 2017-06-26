'use strict';
import app from './app';

const PORT = process.env.PORT || 6666;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

import * as express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import { readFile } from 'fs';

const app = express.default();

// Setup logger
app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// For ssl certificate
app.get('/.well-known/acme-challenge/:tokenValue', (req, res) => {
    readFile(
        path.resolve(
            __dirname,
            '..',
            'build',
            '.well-known/acme-challenge/',
            req.params.tokenValue
        ),
        'ascii',
        function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.send(data.trim());
        }
    );
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

export default app;

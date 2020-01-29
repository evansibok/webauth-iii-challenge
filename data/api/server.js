const express = require('express');

const server = express();

const routes = require('./routes');
const rootMiddleware = require('./root-middleware');

rootMiddleware(server);

server.use('/api', routes);

module.exports = server;
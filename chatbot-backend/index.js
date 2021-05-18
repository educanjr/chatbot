require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');

const config = require('./config/app');
const router = require('./router/index');
const SocketServer = require('./socket');

const app = express();

// Parsers for POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

const server = http.createServer(app);
SocketServer(server);

server.listen(config.appPort, () => {
    console.log(`Application running on ${config.appPort} port.`)
})
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');

const config = require('./config/app');

const router = require('./router/index');

const app = express();

// Parsers for POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.use(cors());

app.use(router);

const server = http.createServer(app);
const SocketsServer = require('./socket');
SocketsServer(server)

app.listen(config.appPort, () => {
    console.log(`Application running on ${config.appPort} port.`)
})
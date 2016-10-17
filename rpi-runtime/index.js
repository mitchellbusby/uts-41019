'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3003);

var SerialPort = require('serialport');
var serial = new SerialPort('/dev/ttyACM0', {baudrate: 9600, parser: SerialPort.parsers.readline("\n")});
/*var ReadLine = SerialPort.parsers.readline;
var parser = port.pipe(ReadLine({delimiter: '\n'}));*/

serial.on('open', () => console.log('Connected to Arduino.'));
serial.on('error', () => console.log('Error trying to connect to Arduino. Will gracefully degrade.'));

import getFreeRooms from './freeRooms';

io.on('connection', function(socket) {
  setTimeout(() => {
    let freeRoomsPromise = getFreeRooms();
    freeRoomsPromise.then(result => {
      console.log(result);
      let freeRoomsInB11 = result
      .filter(x => x.location.indexOf('CB11') !== -1)
      .map(item => { return {
        Temperature: '23',
        RoomName: item.location,
        // TODO - use real data
        TimeFree: Math.floor(Math.random() * (8 - 1)) + 1,
        // TODO - Use real data
        PeopleCount: Math.floor(Math.random() * (30 - 1)) + 1
      }});

      socket.emit('send:roomdata', {
        AvailableRooms: freeRoomsInB11
      });

    });

    socket.emit('send:arduino', {
      slidingPotentiometer: 1700
    });

  }, 3000);

  serial.on('data', data => {
    console.log(data);
    socket.emit('send:arduino', data);
  });

});

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

app.get('/*', function(req, res) {
  res.render('index', {
    env: env
  });
});

var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}

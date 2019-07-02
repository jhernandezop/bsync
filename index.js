const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const AmiClient = require('asterisk-ami-client');
let client = new AmiClient();
const redisFace = require('./redis/redis');
const dateFormat = require('./functions/dateFormat');
let datos={};

let fecha;

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const server = http.createServer(app)
const io = socketIo(server);

app.set('port', process.env.POR || 3000)

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', socket => {
  console.log('ON connection >>>>>>>>>>>>>>> 1');
  //console.log(socket);

  var dir = socket.handshake.address;
  var direccion = dir.split(":");
  ip = direccion[3];
  console.log('ON connection >>>>>>>>>>>>>>> 2: '+ ip);

  //::::::::::::::::::::... armo la sesión cuando un navegador se CONECTA
  var SendRedisSession = {ip:ip, agente:'', estado:'NO_LOGIN', idSocket:socket.id, fecha:'', campania:'', uniqueid:''}
  //:::::::::::::::::... envío a guardar la sesión a redis 
  let res = redisFace.insertSession(SendRedisSession);
  console.log('ON connection >>>>>>>>>>>>>>> 3: '+ res);

  
  socket.on('message', data => {
    console.log('en el servidor: ' + JSON.stringify(data));
    let mensaje = data.mensaje;
    let usuario = data.usuario;
    console.log('-->>> mensaje'+mensaje + ' usuario: ' + usuario);

    socket.broadcast.emit('message', {
      mensaje,
      usuario: usuario
    });
    
  })
});


server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});

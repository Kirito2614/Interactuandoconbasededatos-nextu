
const http = require('http');
      path = require('path'), 
      express = require('express'), .
      session = require('express-session'), 
      bodyParser = require('body-parser'); 
      MongoClient = require('mongodb').MongoClient,
      mongoose = require('mongoose'), 
 
	     connection = mongoose.connect('mongodb://localhost/agenda_db', {useMongoClient: true}, function(error){
           if(error){ //Verificar si existe error al conectarse a mongo
           	 console.log(error.name +" "+ error.message); 
           }else{
              console.log('Conectado a MongoDB'); 
           }
        });


const RoutingUsers = require('./rutasUsuarios.js'), //ruta de interacción de usuarios
      RoutingEvents = require('./rutasEventos.js') //ruta de interacción de eventos

const PORT = 3000 //Define el puerto de conexión
const app = express() 

const Server = http.createServer(app) 

app.use(express.static('../client'))
app.use(bodyParser.json()).
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({ //Iniciar modulo de manejo de sesiones
    secret: 'secret-pass',
    cookie: { maxAge: 3600000 }, 
    resave: false,
    saveUninitialized: true,
  }));

app.use('/usuarios', RoutingUsers)
app.use('/events', RoutingEvents) 

Server.listen(PORT, function() { //Inicia el servidor
  console.log('Server is listening on port: ' + PORT) 
})

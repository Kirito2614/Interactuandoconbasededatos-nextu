const Router = require('express').Router();
const Usuarios = require('./modelUsuarios.js')
const Eventos = require('./modelEventos.js')
const Operaciones = require('./crud.js')
//Verificar si existe el usuario DEMO
Router.get('/demo', function(req, res) {
  Usuarios.find({user: req.query.user}).count({}, function(err, count) { //Verificar si exste el usuario DEMO
    if(count>0){ //Si el registro es mayor a 0
        res.send("Utilice los siguientes datos: </br>usuario: demo | password:123456) //Mostrra mensaje con los datos de los usuarios predeterminados
    }else{
      Eventos.find({}).count({}, function(err, count) { //Si no existen usuarios en la base de datos Verificar que no exista ningún evento creado en la base de datos
        if(count>0){ //Si existen eventos
          Eventos.remove({},function(err, doc){ //Vaciar la tabla eventos
          if(err){
            console.log(err)
          }else{
            console.log("Información de eventos reinicializada") //Mostrar mensaje en cónsola
          }
        })
      }
    })
      Operaciones.crearUsuarioDemo((error, result) => { //Si no , llamar la función crearUsuarioDemo en el modelo modelUsuarios.js
        if(error){
          res.send(error) //Enviar mensaje de error
        }else{
          res.send(result) //Enviar mensaje de resultado
        }
      })
    }
  })
})

//Validar formulario de inicio de sesion
Router.post('/login', function(req, res) {
    let user = req.body.user 
    let password = req.body.pass, 
    sess = req.session; 
    Usuarios.find({user: user}).count({}, function(err, count) { 
        if (err) {
            res.status(500)
            res.json(err) 
        }else{
          if(count == 1){ 
            Usuarios.find({user: user, password: password }).count({}, function(err, count) { 
                if (err) {
                    res.status(500) 
                    res.json(err) 
                }else{
                  if(count == 1){ 
                    sess.user = req.body.user; 
                    res.send("Validado")
                  }else{ 
                    res.send("Contraseña incorrecta") 
                  }
                }
            })
          }else{
            res.send("Usuario no registrado") 
          }
        }

    })
})

//Validar formulario de inicio de sesion
Router.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
  if(err) {
    console.log(err); 
    res.json(err) 
  } else {
    req.session = null 
    res.send('logout') 
    res.end()
  }
  });
});

Router.all('*', function(req, res) {
  res.send('Error al mostrar el recurso solicitado. Por favor verifique la dirección url a la cual desea ingresar' )
  res.end()
})

module.exports = Router //Exportar el módulo Router

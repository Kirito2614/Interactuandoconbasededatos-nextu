var Usuario = require('./modelUsuarios.js') //Asignarle a la variable USUARIO el modelo del usuario

module.exports.crearUsuarioDemo = function(callback){ //Función para crear usuarios
  var arr = [{ email: 'demo@mail.com', user: "demo", password: "123456"}]; 
  Usuario.insertMany(arr, function(error, docs) { //Utilizar la función insertMany para insertar varios registros en una sola consulta
    if (error){
      if (error.code == 11000){ //Verificar si el nombre de usuario existe
        callback("Utilice los siguientes datos: </br>usuario: demo | password:123456") //Mostrar mensaje
      }else{
        callback(error.message) //mensaje de error
      }
    }else{
      callback(null, "El usuario 'demo' se ha registrado. </br>usuario: demo | password:123456) 
    }
  });
}

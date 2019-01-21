let mongoose = require('mongoose'), 
    Schema = mongoose.Schema 

let UserSchema = new Schema({ //Cerrar el esquema de los usuarios
  user: { type: String, required: true, unique: true}, 
  email: { type: String, required: true },
  password: { type: String, required: true}, 
  })

let UsuarioModel = mongoose.model('Usuario', UserSchema) //Definir el modelo del usuario

module.exports = UsuarioModel //Exportar el modelo del usuario

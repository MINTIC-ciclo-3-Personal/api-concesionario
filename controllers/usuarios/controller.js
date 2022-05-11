import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";
import jwt_decode from 'jwt-decode'

const queryAllUsers = async (callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').find().limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
    //implementar código para crear usuario en la BD
    const conexion = getBD();
    await conexion.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
}

const consultarOCrearUsuario = async (req, callback) => {
    //6.1 obtener los datos del usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData']
    console.log(user)
    //6.2 con el correo del usuario o con el id de auth0 verificar si el usuario ya esta en la BD
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ email: user.email }, async (err, response)=>{
        console.log('response consulta bd',response)
        if (response){
            //7.1 si el usuario ya esta en la BD, devuelve la info del usuario
            callback(err, response)
        } else {
            //7.2 si el usuario no esta en la BD, lo crea y devuelve la info
            user.auth0ID=user._id
            delete user._id
            user.rol='sin rol'
            user.estado='pendiente'
            await crearUsuario(user, (err, respuesta)=> callback (err, user));
        }
    });

    
}


const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('usuario').findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
}

const eliminarUsuarios = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) }
    const conexion = getBD();
    await conexion.collection('usuario').deleteOne(filtroUsuario, callback);
}

export { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuarios, consultarUsuario, consultarOCrearUsuario };
import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

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

export { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuarios, consultarUsuario };
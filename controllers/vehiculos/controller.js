import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

const queryAllvehicles = async (callback) => {
    const conexion = getBD();
    await conexion
        .collection('vehiculo')
        .find()
        .limit(50)
        .toArray(callback);
};

const crearVehiculo = async (datosVehiculo, callback) => {
    if (
        Object.keys(datosVehiculo).includes('name') &&
        Object.keys(datosVehiculo).includes('brand') &&
        Object.keys(datosVehiculo).includes('model')
    ) {
        //implementar código para crear vehiculo en la BD
        const conexion = getBD();
        await conexion.collection('vehiculo').insertOne(datosVehiculo, callback);
    } else {
        return 'error';
    };
};

const editarVehiculo = async (edicion,callback) => {
    const filtroVehiculo = { _id: new ObjectId(edicion.id) }
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion
        .collection('vehiculo')
        .findOneAndUpdate(
            filtroVehiculo,
            operacion,
            { upsert: true, returnOriginal: true },
            callback);
}

export { queryAllvehicles, crearVehiculo, editarVehiculo };
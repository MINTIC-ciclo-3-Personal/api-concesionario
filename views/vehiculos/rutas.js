import Express from 'express';
import { crearVehiculo, queryAllvehicles } from '../../controllers/vehiculos/controller.js';
import { getBD } from "../../db/db.js";

const rutasVehiculo = Express.Router();

const genericCallback = (res) => (err, result) => {
        if (err) {
            res.status(500).send('Error consultando los vehiculos');
        } else {
            res.json(result);
        }
    };


rutasVehiculo.route("/vehiculos").get((req, res) => {
    console.log("alguien hizo get en la ruta /vehiculos");
    queryAllvehicles(genericCallback(res));
});

rutasVehiculo.route("/vehiculos/nuevo").post((req, res) => {
    crearVehiculo(req.body, genericCallback(res));
});

rutasVehiculo.route("/vehiculos/editar").patch((req, res) => {
    const edicion = req.body;
    console.log(edicion)
    const filtroVehiculo = { _id: new ObjectId(edicion.id) }
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    conexion
        .collection('vehiculo')
        .findOneAndUpdate(
            filtroVehiculo,
            operacion,
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if (err) {
                    console.error('error actualizando el vehiculo: ', err);
                    res.sendStatus(500);
                } else {
                    console.log('actualizado con exito');
                    res.sendStatus(200);
                }
            })
})

rutasVehiculo.route("/vehiculos/eliminar").delete((req, res) => {
    const filtroVehiculo = { _id: new ObjectId(req.body.id) }
    const conexion = getBD();
    conexion
        .collection('vehiculo')
        .deleteOne(
            filtroVehiculo,
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
});

export default rutasVehiculo;
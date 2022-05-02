import Express from 'express';
import { crearVehiculo, editarVehiculo, eliminarVehiculos, queryAllvehicles } from '../../controllers/vehiculos/controller.js';

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
    editarVehiculo(req.body,genericCallback(res))
})

rutasVehiculo.route("/vehiculos/eliminar").delete((req, res) => {
    eliminarVehiculos(req.body.id, genericCallback(res))
});

export default rutasVehiculo;
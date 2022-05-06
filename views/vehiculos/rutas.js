import Express from 'express';
import { consultarVehiculo, crearVehiculo, editarVehiculo, eliminarVehiculos, queryAllvehicles } from '../../controllers/vehiculos/controller.js';

const rutasVehiculo = Express.Router();

const genericCallback = (res) => (err, result) => {
        if (err) {
            console.log('error', err);
            res.status(500).json({error:err});
        } else {
            res.json(result);
        }
    };


rutasVehiculo.route("/vehiculos").get((req, res) => {
    console.log("alguien hizo get en la ruta /vehiculos");
    queryAllvehicles(genericCallback(res));
});

rutasVehiculo.route("/vehiculos").post((req, res) => {
    crearVehiculo(req.body, genericCallback(res));
});

rutasVehiculo.route("/vehiculos/:id").get((req, res) => {
    console.log("alguien hizo get en la ruta /vehiculos");
    consultarVehiculo(req.params.id,genericCallback(res));
});

rutasVehiculo.route("/vehiculos/:id").patch((req, res) => {
    editarVehiculo(req.params.id, req.body,genericCallback(res))
})

rutasVehiculo.route("/vehiculos/:id").delete((req, res) => {
    eliminarVehiculos(req.params.id, genericCallback(res))
});

export default rutasVehiculo;
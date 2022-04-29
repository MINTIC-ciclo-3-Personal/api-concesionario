//hacer el import de express tradicional
//const express= require('express');

//hace el nuevo improt 
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD, get } from "./db/db.js";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config({ path: './.env' });



const app = Express()

app.use(Express.json());
app.use(Cors());

app.get("/vehiculos", (req, res) => {
    console.log("alguien hizo get en la ruta /vehiculos");
    const conexion = getBD();
    conexion
        .collection('vehiculo')
        .find({})
        .limit(50)
        .toArray((err, result) => {
            if (err) {
                res.status(500).send('Error consultando los vehiculos');
            } else {
                res.json(result);
            }
        })
});

app.post("/vehiculos/nuevo", (req, res) => {
    const datosVehiculo = req.body
    console.log('llaves: ', Object.keys(datosVehiculo));
    try {
        if (
            Object.keys(datosVehiculo).includes('name') &&
            Object.keys(datosVehiculo).includes('brand') &&
            Object.keys(datosVehiculo).includes('model')
        ) {
            //implementar código para crear vehiculo en la BD
            const conexion = getBD();
            conexion.collection('vehiculo').insertOne(datosVehiculo, (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                } else {
                    console.log(result)
                    res.sendStatus(200);
                }
            })
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }

});

app.patch('/vehiculos/editar', (req, res) => {
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

app.delete('/vehiculos/eliminar', (req, res) => {
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

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`)
    });
}

conectarBD(main)
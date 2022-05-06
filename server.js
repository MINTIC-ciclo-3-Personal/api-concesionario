//hacer el import de express tradicional
//const express= require('express');

//hace el nuevo improt 
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from "./db/db.js";
import rutasVehiculo from "./views/vehiculos/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";
import { auth } from 'express-oauth2-jwt-bearer';



dotenv.config({ path: './.env' });

const app = Express()

app.use(Express.json());
app.use(Cors());


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'api-auth-concesionario-mintic',
  issuerBaseURL: `https://misiontic-concesionario-personal.us.auth0.com/`,
});

app.use(checkJwt);

app.use(rutasVehiculo);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`)
    });
}

conectarBD(main)
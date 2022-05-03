import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const strigConexion = process.env.DATABASE_URL;

const client = new MongoClient(strigConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;

const conectarBD = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error('Error conectando a la base de datos');
            return 'error';
        }
        conexion = db.db('concesionario');
        console.log('Conexion exitosa');
        return callback();
    });
}

const getBD =() => {
    return conexion;
}

export { conectarBD, getBD };
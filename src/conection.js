import mongoose from 'mongoose';

/* const connectionString = 'mongodb://127.0.0.1:27017/nuevaMEdicina'; */
const MONGO_URL = 'mongodb://127.0.0.1:27017/dbprueba';

export const initMongoDB = async () => {
        try {
        await mongoose.connect(MONGO_URL);
        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
}

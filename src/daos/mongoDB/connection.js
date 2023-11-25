import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://127.0.0.1:27017/desafioComplementario1';

  try {
    await mongoose.connect(MONGO_URL);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }

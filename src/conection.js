import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://127.0.0.1:27017/ecommerce';

const MONGO_ATLAS_URL = 'mongodb+srv://romerofj26:admin@datavaultcluster.bxnyw28.mongodb.net/ecommerce?retryWrites=true&w=majority';

  try {
    await mongoose.connect(MONGO_ATLAS_URL);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
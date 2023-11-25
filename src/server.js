import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from './routes/views.router.js';
import { Server } from "socket.io";
import fs from 'fs';
import { productDaoFS } from './daos/fileSystem/products.dao.js';

import MessagesDaoFS from './daos/fileSystem/chat.dao.js';
const msgDaoFS = new MessagesDaoFS(__dirname+'/db/messages.json');

import "./daos/mongoDB/connection.js";
import { errorHandler } from "./middleware/errorHandler.js";

import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));

app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Escuchando en el puerto: ${PORT}`);
});

const socketServer = new Server(httpServer);
let products = []; // Array de productos

// Cargar los productos desde el archivo al arrancar el servidor
fs.readFile('./products.json', 'utf-8', (err, data) => {
  if (!err) {
    products = JSON.parse(data);
  } else {
    console.error('Error al cargar los productos del archivo:', err);
  }
});

socketServer.on('connection', async (socket) => {
  console.log('✔ Cliente conectado');

  // Emitir productos al cliente al conectarse
  socket.emit('arrayProducts', products);

  socket.on('newProduct', (product) => {
    // Agregar el nuevo producto al array de productos
    products.push(product);

    // Emitir el nuevo producto a todos los clientes
    socketServer.emit('arrayProducts', products);

    // Guardar los productos en el archivo products.json
    fs.writeFile('./products.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar los productos:', err);
      } else {
        console.log('Productos guardados exitosamente en "products.json"');

        // Emitir el nuevo producto a todos los clientes, incluyendo al que lo creó
        socketServer.emit('newProductAdded', product);
      }
    });
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await productDaoFS.deleteProduct(parseInt(productId));
      const updatedProducts = await productDaoFS.getProducts();

      // Emitir los productos actualizados a todos los clientes
      socketServer.emit('arrayProducts', updatedProducts);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  });

    console.log('🟢 ¡New connection!', '✨' + socket.id + '✨');
    socketServer.emit('messages', await msgDaoFS.getAll());

    socket.on('disconnect', ()=>console.log('🔴 ¡User disconnect!', socket.id));
    socket.on('newUser', (user)=>console.log(`⏩ ${user} inició sesión`));

    socket.on('chat:message', async(msg)=>{
        await msgDaoFS.createMsg(msg);
        socketServer.emit('messages', await msgDaoFS.getAll());
    })

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user)
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})
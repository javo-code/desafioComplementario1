import { Router } from "express";
const router = Router();

import { productValidator } from "../middleware/productValidator.js";
/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/products.controller.js";


//MOSTRAR TODOS LOS PRODUCTOS
router.get("/", getAllProducts);

//CREAR PRODUCTO.
router.post("/", productValidator, createProduct);

//MOSTRAR PRODUCTO POR ID.
router.get("/:id", getProductById);

//MODIFICAR PRODUCTO.
router.put("/:id", updateProduct);

//ELIMINAR PRODUCTO.
router.delete("/:id", deleteProduct);

//CREAR PRODUCTO y AGREGAR IMG.
//seguir probando...

export default router;
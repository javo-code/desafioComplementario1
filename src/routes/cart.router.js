import { Router } from "express";
const router = Router();

/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import { createCart, deleteCart, getAllCarts, getCartById, updateCart } from "../controllers/carts.controller.js";


//MOSTRAR TODOS LOS PRODUCTOS
router.get("/", getAllCarts);

//CREAR PRODUCTO.
router.post("/", createCart);

//MOSTRAR PRODUCTO POR ID.
router.get("/:id", getCartById);

//MODIFICAR PRODUCTO.
router.put("/:id", updateCart);

//ELIMINAR PRODUCTO.
router.delete("/:id", deleteCart);

export default router;
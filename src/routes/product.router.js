import { Router } from "express";
import * as controller from "../controllers/products.controller.js"

import { productValidator } from "../middleware/productValidator.js";

const router = Router();
//MOSTRAR TODOS LOS PRODUCTOS
router.get("/", controller.getAll);

//CREAR PRODUCTO.
router.post("/", productValidator, controller.create);

//MOSTRAR PRODUCTO POR ID.
router.get("/:pid", controller.getById);

//MODIFICAR PRODUCTO.
router.put("/:id", controller.update);

//ELIMINAR PRODUCTO.
router.delete("/:pid", controller.remove);

export default router;
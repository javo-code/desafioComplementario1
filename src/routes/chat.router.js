import { Router } from "express";
const router = Router();

import { createMsg, deleteMsg, getAllMsgs, getMsgById, updateMsg } from "../controllers/chat.controller.js";


//MOSTRAR TODOS LOS MENSAJESS
router.get("/", getAllMsgs);

//CREAR MENSAJES.
router.post("/", productValidator, createMsg);

//MOSTRAR MENSAJES POR ID.
router.get("/:id", getMsgById);

//MODIFICAR MENSAJES.
router.put("/:id", updateMsg);

//ELIMINAR MENSAJES.
router.delete("/:id", deleteMsg);

export default router;
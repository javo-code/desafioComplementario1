import { Router } from "express";
const router = Router();

import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from "../controllers/chat.controller.js";


//MOSTRAR TODOS LOS MENSAJESS
router.get("/", getAllMessages);

//CREAR MENSAJES.
router.post("/", createMessage);

//MOSTRAR MENSAJES POR ID.
router.get("/:id", getMessageById);

//MODIFICAR MENSAJES.
router.put("/:id", updateMessage);

//ELIMINAR MENSAJES.
router.delete("/:id", deleteMessage);

export default router;
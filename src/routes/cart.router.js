import { Router } from "express";
const router = Router();
import { cartDaoFS } from "../dao/fileSystem/carts.Dao.js";


//MOSTRAR TODOS LOS CARRITOS.
router.get("/", async (req, res) => {
    try {
        const carts = await cartDaoFS.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(404).json({ message: "The cart does not exist..." });
    }
});

//OBTENER CARRITO POR ID.
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartById = await cartDaoFS.getCartById(Number(cid));
        if (!cartById) {
            res.status(404).json({ message: "The cart does not exist..." });
        } else {
            res.status(200).json(cartById);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//AGREGAR PRODUCTOS UN CARRITO POR ID.
router.post('/:idCart/product/:idProd', async (req, res) => {
    try {
        const { idCart, idProd } = req.params; // Obtenener los valores de los parametros
        const cart = await cartDaoFS.saveProductToCart(idCart, idProd); // Llama al metodo para guardar el producto en el carrito

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: `Catch error en el router ${error.message}` });
    }
});



// Ruta para crear un nuevo carrito.
router.post("/", async (req, res) => {
    try {
        //crear el carrito
        const cartCreated = await cartDaoFS.createCart(req.body);
        res.status(200).json(cartCreated);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ruta para actualizar un CARRITO por su ID.
router.put("/:cid", async (req, res) => {
    try {
        const cart = { ...req.body };
        const { id } = req.params;
        const idNumber = Number(id);
        const cartOk = await cartDaoFS.getCartById(idNumber);
        if (!cartOk) {
            res.status(404).json({ message: "The cart does not exist..." });
        } else {
            await cartDaoFS.deleteCart(cart, idNumber);
            res.status(200).json({ message: `cart ID: ${id} updated successfully!` });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;

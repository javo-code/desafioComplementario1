import { Router } from "express";
import fs from 'fs';

const router = Router();
const path = './products.json';

router.get('/', async (req, res) => {
    try {
        let productsJSON = await fs.promises.readFile(path, 'utf-8');
        let products = JSON.parse(productsJSON);
        res.render('home', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

export default router;

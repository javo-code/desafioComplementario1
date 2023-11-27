import { initMongoDB } from "./conection.js"
import { ProductModel } from "./daos/mongoDB/models/products.model.js";

const createProduct = async (product) => {
    await ProductModel.create(product);
}

const test = async () => {
    try {
        await initMongoDB();

        const newProduct = {
            title: "Venda",
            description: "2.5cm x 9m",  
            code: "ACC2003",
            price: 880,
            stock: 100,
            category: "deponsables",
            thumbnails: "NoimgYet"
        }
        await createProduct(newProduct);
        console.log("Product created successfully")
    } catch (error) {
        console.log(error)
    }
}

test();

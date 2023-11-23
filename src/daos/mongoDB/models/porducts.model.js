import { Schema, model } from "mongoose";

export const productCollection = "product";

export const productSchema = new Schema({
    status: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String }
});

export const ProductModel = model(productCollection, productSchema);

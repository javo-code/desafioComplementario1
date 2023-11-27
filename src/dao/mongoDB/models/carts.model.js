import { Schema, model } from "mongoose";

const cartCollectionName = 'carts'

export const cartSchema = new Schema({
    products: { type: Array },
});

export const CartModel = model(cartCollectionName, cartSchema);
import { CartModel } from "./models/carts.model.js";

export default class CartsDaoMongoDB {
    async getAll() {
        try {
        const response = await CartModel.find({});
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await CartModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

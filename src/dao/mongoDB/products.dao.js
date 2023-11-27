import { ProductModel } from "./models/products.model.js";

export default class ProductDaoMongoDB {
    async getAll() {
        try {
        const response = await ProductModel.find({});
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await ProductModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

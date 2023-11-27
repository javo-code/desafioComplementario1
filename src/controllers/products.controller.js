// import { getAll, getById, create, update, remove } from "../services/product.services.js";
import * as service from "../services/products.services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) res.status(404).json({ msg: "Product Not found!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    if (!response) res.status(404).json({ msg: "Error create product!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.update(id, req.body);
    if (!response) res.status(404).json({ msg: "Error update product! The ID does not exists..." });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.remove(id);
    if (!response) res.status(404).json({ msg: "Error delete product! The ID does not exists..." });
    else res.status(200).json({ msg: `Product id: ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};

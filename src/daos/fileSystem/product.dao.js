import fs from "fs";

export default class ProductDaoFS {

  constructor(path) {
    this.path = path;
  }
  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(productsJSON);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async #getMaxId() {
    let maxId = 0;
    const products = await this.getAll();
    products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  async create(prod) {
    try {
      const product = {
        id: (await this.#getMaxId()) + 1,
        status: true,
        ...prod
      };
      const products = await this.getAll();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const product = products.find((prod) => prod.id === Number(id));
      if (product) {
        return product;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async update(obj, id) {
    try {
      const products = await this.getAll();
      const productIndex = products.findIndex(prod => prod.id === id);
      if (productIndex === -1) return false;
      else {
        products[productIndex] = { ...products[productIndex], ...obj, id };

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return products[productIndex];
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(idProduct) {
    try {
      const products = await this.getAll();
      if (products.length < 0) return false;
      const updatedArray = products.filter((product) => product.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(updatedArray));
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const productsFile = await this.getAll();
      if (productsFile.length > 0) {
        const newArray = productsFile.filter((prod) => prod.id !== Number(id));
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        return true
      } else {
        throw new Error(`Product id: ${id} not found`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const productDaoFS = new ProductDaoFS("./data/products.json")

export { ProductDaoFS }
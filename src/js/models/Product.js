import { API } from '../API.js'

class Product {
  static #instance = null

  constructor() {
    if (Product.#instance) {
      return Product.#instance
    }

    Product.#instance = this

    if (!API.getInstance()) {
      new API()
    }

    this._APIInstance = API.getInstance()

    this._productsURL = `${this._APIInstance.baseURL}/products`

    this._myProductsURL = `${this._APIInstance.baseURL}/my/products`

  }

  static getInstance() {
    return Product.#instance
  }

  // Fetch products
  async getAll() {
    //TODO
  }

}

export { Product }

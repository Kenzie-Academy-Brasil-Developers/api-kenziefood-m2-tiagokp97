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

    this._productsURL = `${this._APIInstance.baseURL}products`

    this._myProductsURL = `${this._APIInstance.baseURL}my/products`

  }

  static getInstance() {
    return Product.#instance
  }

  async getMyProducts(token) {
    const response = await fetch(this._myProductsURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await response.json()

    if (response.status !== 200) {
      throw new Error(responseData.message)
    } else {
      return responseData
    }
  }

  async getAll() {
    const response = await fetch(this._productsURL)

    const responseData = await response.json()

    if (response.status !== 200) {
      throw new Error(responseData.message)
    } else {
      return responseData
    }
  }

}

export { Product }

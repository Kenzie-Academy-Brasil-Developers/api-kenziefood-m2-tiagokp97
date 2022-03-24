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

  async create(data, token) {
    try {
      const response = await fetch(this._myProductsURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (response.status !== 201) {
        throw new Error(responseData.error)
      } else {
        return responseData
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async edit(id, data, token) {
    try {
      const response = await fetch(`${this._myProductsURL}/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (response.status !== 202) {
        throw new Error(responseData.message)
      } else {
        return responseData
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async delete(id, token) {
    try {
      const response = await fetch(`${this._myProductsURL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status !== 204) {
        const responseData = await response.json()
        throw new Error(responseData.message)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export { Product }

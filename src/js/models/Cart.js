import { API } from '../API.js'

class Cart {
  static #instance = null

  constructor() {
    if (Cart.#instance) {
      return Cart.#instance
    }

    Cart.#instance = this

    if (!API.getInstance()) {
      new API()
    }

    this._APIInstance = API.getInstance()

    this._cartURL = `${this._APIInstance.baseURL}cart`
    this._postCartURL = `${this._APIInstance.baseURL}cart/add`
  }

  static getInstance() {
    return Cart.#instance
  }

  async getCart(token) {
    const response = await fetch(this._cartURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await response.json()

    if (response.status !== 200) {
      throw new Error(responseData.menssage)
    } else {
      return responseData
    }
  }

  async postCart(idProduct,token) {
    const response = await fetch(this._postCartURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(idProduct)
    })
    
    const responseData = await response.json()

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.status)
    } else {
      return responseData
    }
  }

  async deleteCart (idProduct,token) {
    const response = await fetch(`${this._cartURL}/remove/${idProduct}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // const responseData = await response.json()

    // return responseData
  }

  // Fetch
  async removeItem() {
    //TODO
  }
}

export { Cart }

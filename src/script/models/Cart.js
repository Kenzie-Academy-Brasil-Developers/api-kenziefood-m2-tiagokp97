import { API } from './API.js'

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

    this._cartURL = `${this._APIInstance.baseURL}/cart`
  }

  static getInstance() {
    return Cart.#instance
  }

  // Fetch
  removeItem() {
    //TODO
  }
}

export { Cart }

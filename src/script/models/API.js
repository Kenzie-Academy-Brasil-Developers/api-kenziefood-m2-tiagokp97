class API {
  static #instance = null

  constructor() {
    if (API.#instance) {
      return API.#instance
    }

    API.#instance = this

    this._baseURL = 'https://kenzie-food-api.herokuapp.com/'
  }

  static getInstance() {
    return API.#instance
  }

  get baseURL() {
    return this._baseURL
  }
}

export { API }

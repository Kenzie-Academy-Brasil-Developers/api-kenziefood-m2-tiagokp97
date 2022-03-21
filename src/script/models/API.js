class API {
  static #instance = null

  constructor() {
    if (API.#instance) {
      return API.#instance
    }

    API.#instance = this

    this._baseURL = 'https://api-blog-m2.herokuapp.com'
  }

  static getInstance() {
    return API.#instance
  }

  get baseURL() {
    return this._baseURL
  }
}

export { API }

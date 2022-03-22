import { API } from '../API.js'

class User {
  static #instance = null

  constructor() {
    if (User.#instance) {
      return User.#instance
    }

    User.#instance = this

    if (!API.getInstance()) {
      new API()
    }

    this._APIInstance = API.getInstance()

    this._authURL = `${this._APIInstance.baseURL}/auth`
  }

  static getInstance() {
    return User.#instance
  }

  // Fetch
  async register() {
    //TODO
  }
}

export { User }
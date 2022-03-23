import { API } from "../API.js"

class HomeTemplate {
  static #instance = null

  constructor() {
    if (HomeTemplate.#instance) {
      return HomeTemplate.#instance
    }

    if (!API.getInstance()) {
      new API()
    }

    HomeTemplate.#instance = this
  }

  static getInstance() {
    return HomeTemplate.#instance
  }


  

}

export { HomeTemplate }

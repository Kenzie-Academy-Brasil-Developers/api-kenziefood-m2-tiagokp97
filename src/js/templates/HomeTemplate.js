class HomeTemplate {
  static #instance = null

  constructor() {
    if (HomeTemplate.#instance) {
      return HomeTemplate.#instance
    }

    HomeTemplate.#instance = this
  }

  static getInstance() {
    return HomeTemplate.#instance
  }
}

export { HomeTemplate }

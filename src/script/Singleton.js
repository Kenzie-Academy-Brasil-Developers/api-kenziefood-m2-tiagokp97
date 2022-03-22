class Singleton {
  static #instance = null

  constructor() {
    if (Singleton.#instance) {
      return Singleton.#instance
    }

    Singleton.#instance = this
  }

  static getInstance() {
    return Singleton.#instance
  }
}

export { Singleton }

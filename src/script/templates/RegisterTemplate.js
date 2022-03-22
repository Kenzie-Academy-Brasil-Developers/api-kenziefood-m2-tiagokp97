class RegisterTemplate {
  static #instance = null

  constructor() {
    if (RegisterTemplate.#instance) {
      return RegisterTemplate.#instance
    }

    RegisterTemplate.#instance = this
  }

  static getInstance() {
    return RegisterTemplate.#instance
  }
}

export { RegisterTemplate }

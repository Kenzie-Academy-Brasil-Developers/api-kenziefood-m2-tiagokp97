class LoginTemplate {
  static #instance = null

  constructor() {
    if (LoginTemplate.#instance) {
      return LoginTemplate.#instance
    }

    LoginTemplate.#instance = this
  }

  static getInstance() {
    return LoginTemplate.#instance
  }
}

export { LoginTemplate }

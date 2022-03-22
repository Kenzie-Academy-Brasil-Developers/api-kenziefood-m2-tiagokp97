class DashboardTemplate {
  static #instance = null

  constructor() {
    if (DashboardTemplate.#instance) {
      return DashboardTemplate.#instance
    }

    DashboardTemplate.#instance = this
  }

  static getInstance() {
    return DashboardTemplate.#instance
  }
}

export { DashboardTemplate }

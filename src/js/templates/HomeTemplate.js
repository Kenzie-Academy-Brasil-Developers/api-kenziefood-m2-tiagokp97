class HomeTemplate {
  static #instance = null

  constructor() {
    if (HomeTemplate.#instance) {
      return HomeTemplate.#instance
    }

    HomeTemplate.#instance = this
    
    this._button           = document.querySelector('.head-card')
    this._modalCardMobile  = document.querySelector('.container-modal-card')
    this._exitModalCard    = document.querySelector('.exit-modal-card')

    this.eventCardMobile()
  }

  static getInstance() {
    return HomeTemplate.#instance
  }

  

  eventCardMobile() {
    this._button.addEventListener('click', (evento) => {
      if (innerWidth < 1100) {
        this._modalCardMobile.style.display = 'flex'

      }
    })

    this._exitModalCard.addEventListener('click', (evento) => {
      this._modalCardMobile.style.display = 'none'
    })

  }


}

export { HomeTemplate }

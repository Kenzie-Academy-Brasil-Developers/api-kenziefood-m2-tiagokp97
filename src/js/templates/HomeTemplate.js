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
    this._iconPerfil       = document.querySelector('.icon-modal')
    this._containerLogin   = document.querySelector('.container-modal')
    this._containerPerfil  = document.querySelector('.container-modal-login')

    this._token            = localStorage.getItem('Kenziefood:token')

    this.eventCardMobile()
    this.verifyLogin()
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

  verifyLogin() {
    if (this._token) {
      this._iconPerfil.addEventListener('click', (evento) => {
        if (this._containerPerfil.style.display === 'none'){

          this._containerPerfil.style.display = 'block'
        } else {

          this._containerPerfil.style.display = 'none'
        }
      })
    } else {
      this._iconPerfil.addEventListener('click', (evento) => {
        if (this._containerLogin.style.display === 'none'){

          this._containerLogin.style.display = 'block'
        } else {

          this._containerLogin.style.display = 'none'
        }
      })
    }
  }


}

export { HomeTemplate }

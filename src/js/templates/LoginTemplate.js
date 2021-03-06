import { API } from '../API.js'
import { User } from '../models/User.js'


class LoginTemplate {
  static #instance = null

  constructor() {
    if (LoginTemplate.#instance) {
      return LoginTemplate.#instance
    }


    if (!API.getInstance()) {
      new API()
    }

    if (!User.getInstance()) {
      new User()
    }

    LoginTemplate.#instance = this

    this._UserInstance = User.getInstance()

    this._form = document.querySelector('.form-container')

    this._APIInstance = API.getInstance()

    this._loginURL = `${this._APIInstance.baseURL}/auth/login`

    this._userToken = localStorage.getItem('Kenziefood:token')

    this.createListner()

    this.alreadyLoged()

  }

  static getInstance() {
    return LoginTemplate.#instance
  }

  alreadyLoged(){
    if (this._userToken){
      return window.location.href = "/src/pages/dashboard/dashboard.html"
     } 
  }

  async createListner() {
    const dataForm = {}
    this._form.addEventListener('submit', async function (event) {

      event.preventDefault()
      const inputs = event.target
      for (let i = 0; i < inputs.length; i++) {
        const { name, value } = inputs[i]
        if (name) {
          dataForm[name] = value
        }
      }
      
      const token = await this._UserInstance.login(dataForm)
      await this._UserInstance.login(dataForm)
      localStorage.setItem('Kenziefood:token', token)
      window.location.href = "/src/pages/dashboard/dashboard.html"
    }.bind(this))

  }

}

export { LoginTemplate }

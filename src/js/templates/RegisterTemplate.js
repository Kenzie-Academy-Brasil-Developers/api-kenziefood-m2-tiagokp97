import { API } from "../API.js"
import {User} from "../models/User.js"

class RegisterTemplate {
  static #instance = null

  constructor() {
    if (RegisterTemplate.#instance) {
      return RegisterTemplate.#instance
    }

    if (!API.getInstance()) {
      new API()
      
    }

    if (!User.getInstance()){
      new User()
    }


    RegisterTemplate.#instance = this

    this._UserInstance = User.getInstance()

    this._form = document.querySelector('.form-container')
  
    this._APIInstance = API.getInstance()

    this._loginURL = `${this._APIInstance.baseURL}/auth/register`
      
    this.createListner()

  }

  static getInstance() {
    return RegisterTemplate.#instance
  }
  
  async createListner(){
    
    const dataForm = {}
    this._form.addEventListener('submit', async function(event){
      
      event.preventDefault()
      const inputs = event.target
      for (let i = 0; i < inputs.length; i++) {
      const { name, value } = inputs[i]
        if (name) {
            dataForm[name] = value
        }
      }
      
      await this._UserInstance.register(dataForm)
      await localStorage.setItem('usuario', JSON.stringify(dataForm))
     
    }.bind(this))

  }
}


export { RegisterTemplate }

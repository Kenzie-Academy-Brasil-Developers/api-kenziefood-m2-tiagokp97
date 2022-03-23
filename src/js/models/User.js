import { API } from '../API.js'

class User {
  static #instance = null

  constructor() {
    if (User.#instance) {
      return User.#instance
    }

    User.#instance = this

    if (!API.getInstance()) {
      new API()
    }

    this._APIInstance = API.getInstance()

    this._authURL = `${this._APIInstance.baseURL}auth`
  

  }

  static getInstance() {
    return User.#instance
  }

  // Fetch
  async register(data) {
    console.log(this._authURL)
    const response = await fetch(`${this._authURL}/register`, {
      "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
    })

    const responseData = await response.json()
    console.log(response)
    if (response.status !== 200){
      throw new Error(`${responseData.message}`)
  }  else { 
     window.location.href = "/src/pages/login/login.html"
  }   
  }

  async login(data){
    const response = await fetch(`${this._authURL}/login`, {
      "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
    })

    
    const responseData = await response.json()
    if (response.status !== 200){
      throw new Error(`${responseData.message}`)
  }  else { 
    return responseData
  }  

  }

}

export { User }
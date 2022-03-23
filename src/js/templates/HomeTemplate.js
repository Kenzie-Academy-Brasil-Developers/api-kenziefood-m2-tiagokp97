import { API } from '../API.js'
import {Product} from '../models/Product.js'

class HomeTemplate {
  static #instance = null

  constructor() {
    if (HomeTemplate.#instance) {
      return HomeTemplate.#instance
    }

    if (!API.getInstance()) {
      new API()
    }

    if (!Product.getInstance()) {
      new Product()
    }

    HomeTemplate.#instance = this
    
    this._button           = document.querySelector('.head-card')
    this._modalCardMobile  = document.querySelector('.container-modal-card')
    this._exitModalCard    = document.querySelector('.exit-modal-card')
    this._iconPerfil       = document.querySelector('.icon-modal')
    this._containerLogin   = document.querySelector('.container-modal')
    this._containerPerfil  = document.querySelector('.container-modal-login')
    this._showcase         = document.querySelector('.showcase-products')
    this._showcaseModal    = document.querySelector('.modal-card')
    this._modalEmptyMobile = document.querySelector('.modal-empty')
    this._modalimgMobile   = document.querySelector('.modal-img-empty')
    this._priceModalTotal  = document.querySelector('.modal-price-total')
    this._modalCountTotal  = document.querySelector('.modal-count-total')

    this._token            = localStorage.getItem('Kenziefood:token')

    this._productModels    = Product.getInstance()

    this._BdLocalStorage   = JSON.parse(localStorage.getItem('Kenziefood:card')) || []


    this.eventCardMobile()
    this.verifyLogin()
    this.createTempleProduct(this.getProducts())
    this.createTempleProductMobile()
  }

  static getInstance() {
    return HomeTemplate.#instance
  }

  async getProducts() {
    const products = await this._productModels.getAll()
    return products
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
  
  async createTempleProduct(promisse) {
    const resultPromisse = await promisse

    resultPromisse.forEach((product) => {
      const {categoria, descricao, id, imagem, nome, preco} = product
      
      const article = document.createElement('article')
      article.classList.add('product')

      article.innerHTML = `
      <img src="${imagem}" alt="${nome}" />
      <h2>${nome}</h2>
      <p>${descricao}</p>
      <ul class="section">
      <li>${categoria}</li>
      </ul>
      <ul class="price-and-buy">
      <li class="price">R$ ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)}</li>
        <li class="buy">
        <button class="button-product" id="${id}">
        <i class="fa-solid fa-cart-plus"></i>
          </button>
          </li>
      </ul>
      `
      
      
      this._showcase.appendChild(article)
    })

    const buttonProduct  = document.querySelectorAll('.button-product')

    this.captureProduct(buttonProduct)
  }

  async createTempleProductMobile() {
    if (innerWidth < 1100) {
      this.createMobile()
    } else {
      this.createDesktop()
    }
    
  }

  createMobile() {
    const storange = JSON.parse(localStorage.getItem('Kenziefood:card')) || []
    
    if (storange.length > 0) {
      this._modalEmptyMobile.style.display = 'none'
      this._modalimgMobile.style.display = 'none'
      this._showcaseModal.innerHTML = ``
    }

    for (let i = 0; i < storange.length; i++) {
      const {categoria, imagem, nome, preco} = storange[i]

      const article = document.createElement('article')
      article.classList.add('product-modal')

      article.innerHTML = `
      <img src="${imagem}" alt="${nome}">
      <ul>
        <li class="product-modal-name">${nome}</li>
        <li>
          <ul class="product-modal-section">
            <li>${categoria}</li>
          </ul>
        </li>
        <li class="price-product-modal">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)}</li>
      </ul>
      <button class="button-remove" id="${i}">
        <img src="/src/assets/icon_trash.svg" alt="">
      </button>
      `

      this._showcaseModal.appendChild(article)
    }

    let priceTotal = 0
    for (let i = 0; i < storange.length; i++) {

      const {preco} = storange[i]
      priceTotal += preco
    }

    this._priceModalTotal.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceTotal)
    this._modalCountTotal.innerText = storange.length

    const buttonRemoveMobile = document.querySelectorAll('.button-remove')

    this.removeItens(buttonRemoveMobile)
  }

  removeItens(buttons) {
    buttons.forEach((button) => {
      button.addEventListener('click', async function (evento) {
        const clickButton = evento.currentTarget

        const bd = []

        const id = clickButton.id

        const storange = JSON.parse(localStorage.getItem('Kenziefood:card')) || []

        for (let i = 0; i < storange.length; i++) {
          if (i !== Number(id)) {
            bd.push(storange[i])
          }
        }

        localStorage.setItem('Kenziefood:card',JSON.stringify(bd))
        this._showcaseModal.innerHTML = ``
        this.createMobile()

      }.bind(this))
    })
  }

  async captureProduct (buttons) {

    buttons.forEach((button) => {
      button.addEventListener('click', async function (evento) {
        const locale = evento.currentTarget

        const resultProducts = await this.getProducts()

        const resultFind = resultProducts.find((product) => {
          if (product.id === Number(locale.id)) {
            return product
          }
        })

        if (this._token) {
        } else {
          this._BdLocalStorage = JSON.parse(localStorage.getItem('Kenziefood:card')) || []

          const productsStorange = [resultFind,...this._BdLocalStorage]
  
          const local = JSON.stringify(productsStorange)
  
          localStorage.setItem('Kenziefood:card',local)

          this.createTempleProductMobile()
        }
      }.bind(this))

    })
  }

  captureButtonsModal() {

  }
}

export { HomeTemplate }

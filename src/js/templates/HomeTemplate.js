import { API } from '../API.js'
import { Product } from '../models/Product.js'
import { Cart } from '../models/Cart.js'

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

    if (!Cart.getInstance()) {
      new Cart()
    }

    HomeTemplate.#instance = this

    this._buttonBread = document.querySelector('.button-bread')
    this._btnDrink = document.querySelector('.button-glass')
    this._btnFruit = document.querySelector('.button-fruit')
    this._btnAll = document.querySelector('.button-all')
    this._inputSearch = document.querySelector('.input-search')
    this._button = document.querySelector('.head-card')
    this._modalCardMobile = document.querySelector('.container-modal-card')
    this._exitModalCard = document.querySelector('.exit-modal-card')
    this._iconPerfil = document.querySelector('.icon-modal')
    this._containerLogin = document.querySelector('.container-modal')
    this._containerPerfil = document.querySelector('.container-modal-login')
    this._showcase = document.querySelector('.showcase-products')
    this._showcaseModal = document.querySelector('.modal-card')
    this._modalEmptyMobile = document.querySelector('.modal-empty')
    this._modalimgMobile = document.querySelector('.modal-img-empty')
    this._priceModalTotal = document.querySelector('.modal-price-total')
    this._modalCountTotal = document.querySelector('.modal-count-total')
    this._logout = document.querySelector('#logout')
    this._myProducts = document.querySelector('#MyProducts')
    this._registerModal = document.querySelector('#register-modal')
    this._loginModal = document.querySelector('#login-modal')
    this._cardImgEmpty = document.querySelector('.card-img-empty')
    this._cardEmpty = document.querySelector('.card-empty')
    this._showcaseDesktop = document.querySelector('.shopping-card')
    this._totalPriceDesktop = document.querySelector('.total-price')
    this._totalCountDesktop = document.querySelector('.total-count')
    this._allButtons = document.querySelectorAll('.all-buttons')

    this.clear()

    this._token = localStorage.getItem('Kenziefood:token')

    this._productModels = Product.getInstance()

    this._cardModels = Cart.getInstance()

    this._BdLocalStorage = JSON.parse(localStorage.getItem('Kenziefood:card')) || []





    this.eventCardMobile()
    this.verifyLogin()
    this.addLoading()
    this.createTempleProductMobile()
    this.breadFilterBtn()
    this.fruitFilterBtn()
    this.drinkFilterBtn()
    this.allFilterBtn()
    this.inputSearch()
    this.captureButtonsModal()
    this.createDesktopLogin()

    if (this._token) {
      this.createTempleProduct()
    } else {
      this.createShowcase(this._productModels.getAll())
    }
  }

  addLoading() {
    const loader = document.createElement('div')
    const text = document.createElement('p')
    const inner = document.createElement('div')

    loader.classList.add('loader')
    text.innerText = 'Carregando...'
    inner.classList.add('inner-loader')

    loader.appendChild(text)
    loader.appendChild(inner)
    this._showcase.appendChild(loader)
  }

  removeLoading() {
    const loader = document.querySelector('.loader')

    if (loader) {
      this._showcase.removeChild(loader)
    }
  }

  static getInstance() {
    return HomeTemplate.#instance
  }

  async getProducts() {
    const products = await this._productModels.getAll()
    return products
  }

  async inputSearch() {
    const product = await this._productModels.getAll()
    this._inputSearch.addEventListener('keyup', (event) => {
      const pesquisa = event.target.value.toLowerCase()

      const filtrados = product.filter((produto) => {
        return produto.nome.toLowerCase().includes(pesquisa) || produto.categoria.toLowerCase().includes(pesquisa)
      })
      this.clear()
      this.createTempleProduct(filtrados)
    })
  }

  async allFilterBtn() {
    this._btnAll.addEventListener('click', function () {
      this.uncolourAllButtons()
      this.paintButton(this._btnAll)
      this.clear()
      this.createTempleProduct(this.getProducts())
    }.bind(this))
  }

  async clear() {
    this._showcase.innerHTML = ''
  }

  async filterBreadProducts() {
    const product = await this._productModels.getAll()
    const breadList = product.filter((produto) => {
      return produto.categoria === 'Panificadora'
    })
    return breadList
  }

  async breadFilterBtn() {
    this._buttonBread.addEventListener('click', function () {
      this.uncolourAllButtons()
      this.paintButton(this._buttonBread)
      this.clear()
      this.createTempleProduct(this.filterBreadProducts())
    }.bind(this))
  }

  async filteredDrinkProducts() {
    const product = await this._productModels.getAll()
    const listDrinks = product.filter((produto) => {
      return produto.categoria === 'Bebidas'
    })
    return listDrinks
  }

  async drinkFilterBtn() {
    this._btnDrink.addEventListener('click', function () {
      this.uncolourAllButtons()
      this.paintButton(this._btnDrink)
      this.clear()
      this.createTempleProduct(this.filteredDrinkProducts())
    }.bind(this))
  }

  async filteredFruitProducts() {
    const product = await this._productModels.getAll()
    const fruitList = product.filter((produto) => {
      return produto.categoria === 'Frutas'
    })
    return fruitList
  }

  async fruitFilterBtn() {
    this._btnFruit.addEventListener('click', function () {
      this.uncolourAllButtons()
      this.paintButton(this._btnFruit)
      this.clear()
      this.createTempleProduct(this.filteredFruitProducts())
    }.bind(this))
  }

  async uncolourAllButtons() {
    this._buttonBread.style.backgroundColor = "#FFF7F4";
    this._btnDrink.style.backgroundColor = "#FFF7F4";
    this._btnFruit.style.backgroundColor = "#FFF7F4";
    this._btnAll.style.backgroundColor = "#FFF7F4";

    this._buttonBread.style.color = "black";
    this._btnDrink.style.color = "black";
    this._btnFruit.style.color = "black";
    this._btnAll.style.color = "black";
  }

  paintButton(param) {
    param.style.backgroundColor = "#FF2253";
    param.style.color = "white";
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
        if (this._containerPerfil.style.display === 'none' ||
          this._containerPerfil.style.display === '') {
          this._containerPerfil.style.display = 'block'
        } else {
          this._containerPerfil.style.display = 'none'
        }
      })
    } else {
      this._iconPerfil.addEventListener('click', (evento) => {
        if (this._containerLogin.style.display === 'none' ||
          this._containerLogin.style.display === '') {
          this._containerLogin.style.display = 'block'
        } else {
          this._containerLogin.style.display = 'none'
        }
      })
    }
  }

  async createTempleProduct() {

    const getResponseData = await this._productModels.getMyProducts(this._token)

    this.removeLoading()
    for (let i = 0; i < getResponseData.length; i++) {
      const { categoria, id, descricao, imagem, nome, preco } = getResponseData[i]

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
    }

    const buttonProduct = document.querySelectorAll('.button-product')

    const buttonRemove = document.querySelectorAll('.button-desktop-card')

    this.captureProductLogin(buttonProduct)
    this.captureButtonsRemove(buttonRemove)
  }

  async createTempleProductMobile() {
    if (innerWidth < 1100) {
      if (!this._token) {
        this.createMobile()
      }
    } else {
      if (!this._token) {
        this.createDesktop()
      }
    }

  }

  captureProductLogin(btns) {
    btns.forEach((button) => {
      button.addEventListener('click', async function (evento) {
        const localeClick = evento.currentTarget

        const myProducts = await this._productModels.getMyProducts(this._token)

        const resultFind = myProducts.find((product) => {
          if (product.id === Number(localeClick.id)) {
            return product
          }
        })

        const { id } = resultFind

        const postCart = await this._cardModels.postCart({ product_id: id }, this._token)

        if (innerWidth > 1100) {
          this.createDesktopLogin()
        } else {
          this.createMobileLogin()
        }

      }.bind(this))

    })
  }

  captureButtonsRemove(btns) {
    btns.forEach((btn) => {
      btn.addEventListener('click', async function (evento) {
        const localeClick = evento.currentTarget

        const idClick = localeClick.id
        console.log(idClick)
        const removeItem = await this._cardModels.deleteCart(idClick, this._token)

        console.log(removeItem)

        if (innerWidth > 1100) {
          this._showcaseDesktop.innerHTML = ''
          await this.createDesktopLogin()
        } else {
          this._showcaseModal.innerHTML = ''
          this.createMobileLogin()
        }

      }.bind(this))
    })
  }

  async createDesktopLogin() {
    if (this._token) {

      const getCartModels = await this._cardModels.getCart(this._token)

      if (getCartModels.length > 0) {
        this._cardEmpty.style.display = 'none'
        this._cardImgEmpty.style.display = 'none'
        this._showcaseDesktop.innerHTML = ``
      }

      getCartModels.forEach((product) => {
        const { quantity, products } = product

        const { categoria, id, imagem, nome, preco } = products

        const article = document.createElement('article')
        article.classList.add('product-card')

        article.innerHTML = `
        <img src="${imagem}" alt="${nome}">
        <ul>
          <li class="product-card-name">${nome}</li>
          <li>
            <ul class="product-card-section">
              <li>${categoria}</li>
              <li>quantidade ${quantity}<li>
            </ul>
          </li>
          <li class="price-product-card">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco * quantity)}</li>
        </ul>
        <button class="button-desktop-card" id="${id}">
          <img src="/src/assets/icon_trash.svg" alt="imagem botao apagar">
        </button>
        `

        this._showcaseDesktop.appendChild(article)
      })

      let priceTotal = 0

      for (let i = 0; i < getCartModels.length; i++) {

        const { quantity, products } = getCartModels[i]

        const { preco } = products

        priceTotal += preco * quantity
      }

      let count = 0

      for (let i = 0; i < getCartModels.length; i++) {

        const { quantity, products } = getCartModels[i]

        const { preco } = products

        count += 1 * quantity
      }

      this._totalPriceDesktop.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceTotal)

      this._totalCountDesktop.innerText = count

      const buttonRemove = document.querySelectorAll('.button-desktop-card')
      this.captureButtonsRemove(buttonRemove)
    }
  }

  async createMobileLogin() {
    const getCartModels = await this._cardModels.getCart(this._token)

    if (getCartModels.length > 0) {
      this._modalEmptyMobile.style.display = 'none'
      this._modalimgMobile.style.display = 'none'
      this._showcaseModal.innerHTML = ``
    }

    for (let i = 0; i < getCartModels.length; i++) {
      console.log(getCartModels[i])
      const { quantity, products } = getCartModels[i]

      const { categoria, id, imagem, nome, preco } = products

      const article = document.createElement('article')
      article.classList.add('product-modal')

      article.innerHTML = `
      <img src="${imagem}" alt="${nome}">
      <ul>
        <li class="product-modal-name">${nome}</li>
        <li>
          <ul class="product-modal-section">
            <li>${categoria}</li>
            <li>quantidade ${quantity}<li>
          </ul>
        </li>
        <li class="price-product-modal">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco * quantity)}</li>
      </ul>
      <button class="button-remove" id="${id}">
        <img src="/src/assets/icon_trash.svg" alt="">
      </button>
      `

      this._showcaseModal.appendChild(article)
    }

    let priceTotal = 0
    for (let i = 0; i < getCartModels.length; i++) {

      const { quantity, products } = getCartModels[i]
      const { preco } = products
      priceTotal += preco * quantity
    }

    let count = 0

    for (let i = 0; i < getCartModels.length; i++) {

      const { quantity, products } = getCartModels[i]
      count += 1 * quantity
    }

    this._priceModalTotal.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceTotal)
    this._modalCountTotal.innerText = count

    const buttonRemove = document.querySelectorAll('.button-remove')
    this.captureButtonsRemove(buttonRemove)
  }

  createDesktop() {
    const storage = JSON.parse(localStorage.getItem('Kenziefood:card')) || []

    if (storage.length > 0) {
      this._cardEmpty.style.display = 'none'
      this._cardImgEmpty.style.display = 'none'
      this._showcaseDesktop.innerHTML = ``
    }

    for (let i = 0; i < storage.length; i++) {
      const { categoria, imagem, nome, preco, quantidade } = storage[i]

      const article = document.createElement('article')
      article.classList.add('product-card')

      article.innerHTML = `
      <img src="${imagem}" alt="${nome}">
      <ul>
        <li class="product-card-name">${nome}</li>
        <li>
          <ul class="product-card-section">
            <li>${categoria}</li>
            <li>quantidade ${quantidade || 1}<li>
          </ul>
        </li>
        <li class="price-product-card">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco * (quantidade || 1))}</li>
      </ul>
      <button class="button-desktop-card" id="${i}">
        <img src="/src/assets/icon_trash.svg" alt="imagem botao apagar">
      </button>
      `

      this._showcaseDesktop.appendChild(article)
    }

    let priceTotal = 0

    for (let i = 0; i < storage.length; i++) {

      const { preco, quantidade } = storage[i]
      priceTotal += preco * (quantidade || 1)
    }

    let count = 0

    for (let i = 0; i < storage.length; i++) {

      const { quantidade } = storage[i]
      count += 1 * (quantidade || 1)
    }


    this._totalPriceDesktop.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceTotal)
    this._totalCountDesktop.innerText = count

    const buttonsDesktop = document.querySelectorAll('.button-desktop-card')

    this.removeItens(buttonsDesktop)
  }

  createMobile() {
    const storage = JSON.parse(localStorage.getItem('Kenziefood:card')) || []

    if (storage.length > 0) {
      this._modalEmptyMobile.style.display = 'none'
      this._modalimgMobile.style.display = 'none'
      this._showcaseModal.innerHTML = ``
    }

    for (let i = 0; i < storage.length; i++) {
      const { categoria, imagem, nome, preco, quantidade } = storage[i]

      const article = document.createElement('article')
      article.classList.add('product-modal')

      article.innerHTML = `
      <img src="${imagem}" alt="${nome}">
      <ul>
        <li class="product-modal-name">${nome}</li>
        <li>
          <ul class="product-modal-section">
            <li>${categoria}</li>
            <li>quantidade ${quantidade || 1}<li>
          </ul>
        </li>
        <li class="price-product-modal">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco * (quantidade || 1))}</li>
      </ul>
      <button class="button-remove" id="${i}">
        <img src="/src/assets/icon_trash.svg" alt="">
      </button>
      `

      this._showcaseModal.appendChild(article)
    }

    let priceTotal = 0
    for (let i = 0; i < storage.length; i++) {

      const { preco, quantidade } = storage[i]
      priceTotal += preco * (quantidade || 1)
    }

    let count = 0

    for (let i = 0; i < storage.length; i++) {

      const { quantidade } = storage[i]
      count += 1 * (quantidade || 1)
    }

    this._priceModalTotal.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceTotal)
    this._modalCountTotal.innerText = count

    const buttonRemoveMobile = document.querySelectorAll('.button-remove')

    this.removeItens(buttonRemoveMobile)
  }

  removeItens(buttons) {
    buttons.forEach((button) => {
      button.addEventListener('click', async function (evento) {
        const clickButton = evento.currentTarget

        const bd = []

        const id = clickButton.id

        const storage = JSON.parse(localStorage.getItem('Kenziefood:card')) || []

        for (let i = 0; i < storage.length; i++) {
          if (i !== Number(id)) {
            bd.push(storage[i])
          } else {
            if (storage[i].quantidade > 1) {
              storage[i].quantidade -= 1
              bd.push(storage[i])
            }
          }
        }
        // passe por esse for 
        // verifique se o produto tem quantidade
        // se nao tiver quantidade retira o produto
        // se tiver quantidade retira -1

        localStorage.setItem('Kenziefood:card', JSON.stringify(bd))

        this._showcaseModal.innerHTML = ``

        if (innerWidth > 1100) {
          this._showcaseDesktop.innerHTML = ``
          this.createDesktop()
        }

        this.createMobile()

      }.bind(this))
    })
  }

  async captureProduct(buttons) {

    buttons.forEach((button) => {
      button.addEventListener('click', async function (evento) {
        const locale = evento.currentTarget

        const resultProducts = await this.getProducts()

        const resultFind = resultProducts.find((product) => {
          if (product.id === Number(locale.id)) {
            return product
          }
        })


        this._BdLocalStorage = JSON.parse(localStorage.getItem('Kenziefood:card')) || []

        let verifyProduct = false

        this._BdLocalStorage.forEach((product) => {

          if (product.nome === resultFind.nome) {
            if (!product.quantidade) {
              product.quantidade = 1
            }
            product.quantidade = product.quantidade + 1
            verifyProduct = true
          }

        })

        if (verifyProduct === true) {
          resultFind.quantidade += 1

          const productsStorange = [resultFind, ...this._BdLocalStorage]

          const local = JSON.stringify(productsStorange)

          localStorage.setItem('Kenziefood:card', JSON.stringify(this._BdLocalStorage))

        } else {
          const productsStorange = [resultFind, ...this._BdLocalStorage]

          const local = JSON.stringify(productsStorange)

          localStorage.setItem('Kenziefood:card', local)
        }

        if (!this._token) {
          this.createTempleProductMobile()
        }

      }.bind(this))

    })
  }

  captureButtonsModal() {
    this._logout.addEventListener('click', (evento) => {
      window.location.href = "/index.html"
      localStorage.clear()
    })

    this._myProducts.addEventListener('click', (evento) => {
      window.location.href = "/src/pages/dashboard/dashboard.html"
    })

    this._loginModal.addEventListener('click', (evento) => {
      window.location.href = "/src/pages/login/login.html"
    })

    this._registerModal.addEventListener('click', (evento) => {
      window.location.href = "/index.html"
    })
  }

  async createShowcase(promisse) {
    const resultado = await promisse

    this.removeLoading()
    resultado.forEach((product) => {
      const { categoria, id, descricao, imagem, nome, preco } = product

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

    const buttonProduct = document.querySelectorAll('.button-product')



    this.captureProduct(buttonProduct)


  }
}

export { HomeTemplate }

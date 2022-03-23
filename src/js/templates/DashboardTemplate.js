import { Product } from '../models/Product.js'

class DashboardTemplate {
  static #instance = null

  constructor() {
    if (DashboardTemplate.#instance) {
      return DashboardTemplate.#instance
    }

    DashboardTemplate.#instance = this

    if (!Product.getInstance()) {
      new Product()
    }

    this._productInstance = Product.getInstance()

    this._productList = document.getElementById('productList')

    this.listProducts()

    this.breadFilterBtn()
    this.breadFilter()

    this.fruitFilter()
    this.fruitFilterBtn()

    this.drinkFilter()
    this.drinkFilterBtn()

    this.allFilter()

    this.inputSearch()
  }

  static getInstance() {
    return DashboardTemplate.#instance
  }

  async clean(){
    return this._productList.innerHTML = ''
  }

  async listProducts() {

    const data = await this._productInstance.getAll()
    data.forEach(product => {
      this.createProduct(product)
    }) 
  }

  async allFilter(){
    const data = await this._productInstance.getAll()
    const allBtn = document.querySelector('.button-all')

    allBtn.addEventListener('click', function(){
      this.clean()
      this.listProducts()
    }.bind(this))
  }

  async breadFilter(){
    const data = await this._productInstance.getAll()
    const breadList = data.filter((produto) => {
      return produto.categoria === 'Panificadora'
    }) 
    breadList.forEach(product => {
      this.createProduct(product)
    }) 
  }
  
  async inputSearch(){
  const data = await this._productInstance.getAll()

  const inputSearch = document.querySelector('.input-search')
  inputSearch.addEventListener('keyup', (event) => {
    const pesquisa = event.target.value

    const filtrados = data.filter((produto) => {
        return produto.nome.toLowerCase().includes(pesquisa) || produto.categoria.toLowerCase().includes(pesquisa)

    })
 
    this.clean()
    filtrados.forEach(product => {
      this.createProduct(product)
    }) 
    })
  }


  async breadFilterBtn(){
    const btnFruit = document.querySelector('.button-fruit')
    btnFruit.addEventListener('click', function(){
      this.clean()
      this.fruitFilter()
    }.bind(this))
  }

  async fruitFilter(){
    const data = await this._productInstance.getAll()
    const listaPanificadora = data.filter((produto) => {
      return produto.categoria === 'Frutas'
    }) 
    listaPanificadora.forEach(product => {
      this.createProduct(product)
    }) 
  }

  async fruitFilterBtn(){
    const btnBread = document.querySelector('.button-bread')
    btnBread.addEventListener('click', function(){
      this.clean()
      this.breadFilter()
    }.bind(this))
  }

  async drinkFilter(){
    const data = await this._productInstance.getAll()
    const listDrinks = data.filter((produto) => {
      return produto.categoria === 'Bebidas'
    }) 
    listDrinks.forEach(product => {
      this.createProduct(product)
    }) 
  }

  async drinkFilterBtn(){
    const btnDrink = document.querySelector('.button-glass')
    btnDrink.addEventListener('click', function(){
      this.clean()
      this.drinkFilter()
    }.bind(this))
  }

  createProduct(product) {
    const article = document.createElement('article')
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    const categories = document.createElement('ul')
    const category = document.createElement('li')
    const description = document.createElement('p')
    const actions = document.createElement('ul')
    const editLi = document.createElement('li')
    const editButton = document.createElement('button')
    const editImg = document.createElement('img')
    const removeLi = document.createElement('li')
    const removeButton = document.createElement('button')
    const removeImg = document.createElement('img')

    article.className = 'product-item'
    categories.className = 'product-item__categories'
    category.className = 'product-item__category'
    description.className = 'product-item__description'
    actions.className = 'product-item__actions'
    editButton.classList.add('product-item__edit')
    editButton.classList.add('product-item__action')
    removeButton.classList.add('product-item__delete')
    removeButton.classList.add('product-item__action')

    image.src = product.imagem
    image.alt = product.nome
    figcaption.innerText = product.nome
    category.innerText = product.categoria
    description.innerText = product.descricao
    editImg.src = '../../assets/icon_edit.svg'
    editImg.alt = 'Editar produto'
    removeImg.src = '../../assets/icon_trash.svg'
    removeImg.alt = 'Remover produto'

    figure.appendChild(image)
    figure.appendChild(figcaption)
    categories.appendChild(category)
    editButton.appendChild(editImg)
    removeButton.appendChild(removeImg)
    editLi.appendChild(editButton)
    removeLi.appendChild(removeButton)
    actions.appendChild(editLi)
    actions.appendChild(removeLi)

    article.appendChild(figure)
    article.appendChild(categories)
    article.appendChild(description)
    article.appendChild(actions)

    this._productList.appendChild(article)
  }

}

export { DashboardTemplate }

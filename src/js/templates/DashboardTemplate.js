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
  }

  static getInstance() {
    return DashboardTemplate.#instance
  }

  async listProducts() {
    const data = await this._productInstance.getAll()

    data.forEach(product => {
      this.createProduct(product)
    })
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

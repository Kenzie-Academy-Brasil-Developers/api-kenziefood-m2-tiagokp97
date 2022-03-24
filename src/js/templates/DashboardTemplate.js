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

    this._allBtn = document.querySelector('.button-all')

    this._inputSearch = document.querySelector('.input-search')

    this._btnBread = document.querySelector('.button-bread')

    this._btnFruit = document.querySelector('.button-fruit')

    this._btnDrink = document.querySelector('.button-glass')

    this._iconModal = document.querySelector('.icon-modal')

    this._modal = document.querySelector('.container-modal-login')

    this._homeModal = document.querySelector('#Home')

    this._logoutModal = document.querySelector('#logout')

    this._nameUser = document.querySelector('#name-user')

    this._btnCreateProduct = document.getElementById('btnCreateProduct')
    this._btnCancelCreation = document.getElementById('btnCancelCreation')
    this._modalCreateProduct = document.getElementById('modalCreateProduct')
    this._createRadioButtons = document.querySelectorAll('.btn-create-radio')
    this._creationForm = document.getElementById('creationForm')

    this._btnCancelEdition = document.getElementById('btnCancelEdition')
    this._btnDeleteEdition = document.getElementById('btnDeleteEdition')
    this._modalEditProduct = document.getElementById('modalEditProduct')
    this._editRadioButtons = document.querySelectorAll('.btn-edit-radio')
    this._editForm = document.getElementById('editForm')
    this._editId = document.getElementById('editId')
    this._editName = document.getElementById('editName')
    this._editDescription = document.getElementById('editDescription')
    this._editPrice = document.getElementById('editPrice')
    this._editImage = document.getElementById('editImage')

    this._modalDeleteProduct = document.getElementById('modalDeleteProduct')
    this._btnCancelDelete = document.getElementById('btnCancelDelete')
    this._btnYes = document.getElementById('btnYes')
    this._btnNo = document.getElementById('btnNo')

    this._userToken = localStorage.getItem('Kenziefood:token')

    this._data = []

    this.dataProdutos()

    this.listProducts()

    this.breadFilterBtn()
    this.breadFilter()

    this.fruitFilter()
    this.fruitFilterBtn()

    this.drinkFilter()
    this.drinkFilterBtn()

    this.allFilter()

    this.inputSearch()

    this.addListener()
    this.captureButtonModal()

    this.captureNameUser()
  }

  static getInstance() {
    return DashboardTemplate.#instance
  }

  async dataProdutos() {
    this._data = await this._productInstance.getMyProducts(this._userToken)
  }

  async clean() {
    return this._productList.innerHTML = ''
  }

  async listProducts() {
    await this.dataProdutos()
    this._data.forEach(product => { this.createProduct(product) })
  }

  async allFilter() {
    this._allBtn.addEventListener('click', function () {
      this.clean()
      this.listProducts()
    }.bind(this))
  }

  async inputSearch() {
    this._inputSearch.addEventListener('keyup', (event) => {
      const pesquisa = event.target.value.toLowerCase()

      const filtrados = this._data.filter((produto) => {
        return produto.nome.toLowerCase().includes(pesquisa) || produto.categoria.toLowerCase().includes(pesquisa)
      })
      this.clean()
      filtrados.forEach(product => {
        this.createProduct(product)
      })
    })
  }

  async breadFilter() {
    const breadList = this._data.filter((produto) => {
      return produto.categoria === 'Panificadora'
    })
    breadList.forEach(product => {
      this.createProduct(product)
    })
  }

  async breadFilterBtn() {
    this._btnBread.addEventListener('click', function () {
      this.clean()
      this.breadFilter()
    }.bind(this))
  }

  async fruitFilter() {
    const fruitList = this._data.filter((produto) => {
      return produto.categoria === 'Frutas'
    })
    fruitList.forEach(product => {
      this.createProduct(product)
    })
  }

  async fruitFilterBtn() {
    this._btnFruit.addEventListener('click', function () {
      this.clean()
      this.fruitFilter()
    }.bind(this))
  }

  async drinkFilter() {
    const listDrinks = this._data.filter((produto) => {
      return produto.categoria === 'Bebidas'
    })
    listDrinks.forEach(product => {
      this.createProduct(product)
    })
  }

  async drinkFilterBtn() {
    this._btnDrink.addEventListener('click', function () {
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

    editButton.addEventListener('click', function () {
      this._editId.value = product.id
      this._editName.value = product.nome
      this._editDescription.value = product.descricao
      this._editPrice.value = product.preco
      this._editImage.value = product.imagem

      this._editRadioButtons.forEach(rbtn => {
        if (rbtn.value === product.categoria) {
          rbtn.setAttribute('checked', true)
        }
      })

      this._createRadioButtons.forEach(rbtn => {
        if (rbtn.value !== product.categoria) {
          rbtn.removeAttribute('checked')
        }
      })

      this._modalEditProduct.showModal()
    }.bind(this))

    removeButton.addEventListener('click', function () {
      this._modalDeleteProduct.showModal()
    }.bind(this))

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

  addListener() {
    this._btnCreateProduct.addEventListener('click', function () {
      this._modalCreateProduct.showModal()
    }.bind(this))

    this._btnCancelCreation.addEventListener('click', function () {
      this._createRadioButtons.forEach(rbtn => {
        rbtn.removeAttribute('checked')
      })

      this._modalCreateProduct.close()
    }.bind(this))

    this._btnCancelEdition.addEventListener('click', function () {
      this._editRadioButtons.forEach(rbtn => {
        rbtn.removeAttribute('checked')
      })

      this._modalEditProduct.close()
    }.bind(this))

    this._btnCancelDelete.addEventListener('click', function () {
      this._modalDeleteProduct.close()
    }.bind(this))

    this._btnNo.addEventListener('click', function () {
      this._modalDeleteProduct.close()
    }.bind(this))

    this._createRadioButtons.forEach(button => {
      button.addEventListener('change', function (event) {
        this._createRadioButtons.forEach(rbtn => {
          if (rbtn === event.target) {
            rbtn.setAttribute('checked', true)
          }
        })

        this._createRadioButtons.forEach(rbtn => {
          if (rbtn !== event.target) {
            rbtn.removeAttribute('checked')
          }
        })
      }.bind(this))
    })

    this._editRadioButtons.forEach(button => {
      button.addEventListener('change', function (event) {
        this._editRadioButtons.forEach(rbtn => {
          if (rbtn === event.target) {
            rbtn.setAttribute('checked', true)
          }
        })

        this._editRadioButtons.forEach(rbtn => {
          if (rbtn !== event.target) {
            rbtn.removeAttribute('checked')
          }
        })
      }.bind(this))
    })

    this._creationForm.addEventListener('submit', async function (event) {
      event.preventDefault()

      const data = {}

      for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].name) {
          if (event.target[i].type === 'radio') {
            if (event.target[i].checked) {
              data[event.target[i].name] = event.target[i].value
            }
          } else {
            data[event.target[i].name] = event.target[i].value
          }
        }
      }

      await this._productInstance.create(data, this._userToken)
      this.clean()
      this.listProducts()
      this._modalCreateProduct.close()
    }.bind(this))

    this._editForm.addEventListener('submit', async function (event) {
      event.preventDefault()

      const data = {}
      let id = null

      for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].name) {
          if (event.target[i].type === 'radio') {
            if (event.target[i].checked) {
              data[event.target[i].name] = event.target[i].value
            }
          } else {
            if (event.target[i].name === 'id') {
              id = event.target[i].value
            } else {
              data[event.target[i].name] = event.target[i].value
            }
          }
        }
      }

      await this._productInstance.edit(id, data, this._userToken)

      this.clean()
      this.listProducts()
      this._modalEditProduct.close()
    }.bind(this))
  }

  captureButtonModal() {

    this._iconModal.addEventListener('click', (evento) => {

      if (this._modal.style.display === 'none') {
        this._modal.style.display = 'block'
      } else {
        this._modal.style.display = 'none'
      }

    })

    this._logoutModal.addEventListener('click', (evento) => {
      window.location.href = "/src/pages/login/login.html"
      localStorage.clear()
    })

    this._homeModal.addEventListener('click', (evento) => {
      window.location.href = "/src/pages/home/home.html"
    })


  }

  captureNameUser() {
    const token = localStorage.getItem('Kenziefood:token')
  }

}

export { DashboardTemplate }

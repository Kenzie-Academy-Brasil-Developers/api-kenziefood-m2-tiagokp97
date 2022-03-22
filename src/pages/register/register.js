import { API } from '../../js/API.js'
import { RegisterTemplate } from '../../js/templates/RegisterTemplate.js'

new RegisterTemplate()

//Função pega dados do usuário, salva no localStorage e efetua registro

/* form.addEventListener('submit', async function(event){
    
    event.preventDefault()
    const inputs = event.target
    for (let i = 0; i < inputs.length; i++) {
    const { name, value } = inputs[i]
      if (name) {
          dataForm[name] = value
      }
    }

    await localStorage.setItem('UsuarioCadastrado', JSON.stringify(dataForm))
    User.register(dataForm)
  
  }) */




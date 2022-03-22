import { API } from '../../js/API.js'
import { LoginTemplate } from '../../js/templates/LoginTemplate.js'

new LoginTemplate()



//Função pega dados do usuário, salva no localStorage e efetua login 
/* .addEventListener('submit', async function(event){
    
    event.preventDefault()
    const inputs = event.target
    for (let i = 0; i < inputs.length; i++) {
    const { name, value } = inputs[i]
      if (name) {
          dataForm[name] = value
      }
    }

    await localStorage.setItem('usuario' ,JSON.stringify(dataForm))
    //const dataUsuario = await User.login("/login", dataForm) 
    
  
  }) */


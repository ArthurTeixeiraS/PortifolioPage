class FormSubmit{
    constructor(settings){ //define a classe FormSubmit como uma construtora, que recebe o parametro settings
        this.settings = settings; //atributo settings da função constructor() recebe o parametro settings
        this.form = document.querySelector(settings.form) //atributo form da função constructor() recebe o elemento do formulário
        this.button = document.querySelector('.back-button') //atributo button da função constructor() recebe o elemento da classe back-button
        this.formButton = document.querySelector(settings.button) //atributo formButton da função constructor() recebe o elemento do botão
        if (this.form){ //se encontrado o formulário...
            this.url = this.form.getAttribute("action");  //o URL do formulário é obtido através do getAttribute() e jogado para o atributo url
        }
        this.sendForm = this.sendForm.bind(this) // a função sendForm é vinculada ao objeto atual usando "bind" para garantir que o this dentro da função se refira a instância da classe
    }
    displaySuccess(){
        window.location.href = "assets/html/thanks.html" //redireciona o usuário para uma página de agradecimento (thanks.html) quando o formulário é enviado com sucesso.
    }
    displayError(){
        this.button.innerHTML = this.settings.error; //atualiza o texto do botão para exibir uma mensagem de erro, caso ocorra um erro no envio do formulário.
    }
    getFormObject(){
        const formObject = {}; //cria um obj vazio
        const fields = this.form.querySelectorAll("[name]"); // seleciona os campos do formulário (fields) 
        fields.forEach((field) => { //repetição por todos os campos do formulário
           formObject[field.getAttribute("name")] = field.value; //para cada campo, o nome (name do input) do campo é usado como chave e o valor do campo é atribuido ao objeto 'formObject' 
        });
        return formObject; //retorna o formObject com os campos preenchidos
    }
    onSubmission(event){ //será chamada quando o formulário foi enviado
        event.preventDefault(); //previne com que a pagina atualize ao clicar em "enviar"
        event.target.disabled = true; //desabilita o botão
        event.target.innerHTML = "Enviando..."; //muda o texto para "enviando"
        }
    async sendForm(event){ //função assincrona, acionada quando o form é enviado 
    try{
        this.onSubmission(event); // chama on submission com o argumento event 
      await fetch(this.url,{ //usa fetch para fazer uma solicitação POST para o url do formulário
            method: "POST", //POST :D
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()), //
       }); //o corpo da da solicitação é represado por um JSON do objeto retornado pela função getFormObject()
       this.displaySuccess(); //se tudo passar, o displaySuccess() é chamado
    } catch(error){ //se ocorrer algum erro...
        this.displayError(); //a função displayError() é chamada
        throw new Error(error); //lançamento do erro
    }
    }
    
    init(){ //a função init() é chamada para iniciar o comportamento de envio do formulário
        if (this.form) this.formButton.addEventListener("click", () => this.sendForm); //se um formulário for encontrado, um EventListener é adicionado ao botão do formulário, quando ocorre o evento "Click" a função sendForm é chamada
        return this
    }
}
//Fora da classe, é criada uma instância de FormSubmit(obj), com as configurações fornecidas no objeto
const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    error: "Não foi possível enviar sua mensagem... :(",
});
formSubmit.init(); // a função init é chamada para iniciar o comportamento do envio do formulário.
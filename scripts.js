const Modal = {
  //DESAFIO, TIRAR A OPEN E CLOSE, E CRIAR UMA UNICA FUNÇÃO CHAMADA TOOGLE
  open() {
    //abrir modal
    //Adicionar class active ao modal
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close() {
    //fechar o model
    //remover a class active do model
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')

  }
}

const Storage = {
  get() {
    //parse transforma de String para array ou objeto
    return JSON.parse(localStorage.getItem("dev:transactions")) || []
  },
  set(transactions) {
    localStorage.setItem("dev:transactions",
      JSON.stringify(transactions))
  }
}

const Transaction = {

  all: Storage.get(),


  add(transaction) {
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)
    App.reload()

  },

  incomes() {
    let income = 0;
    //pegar todas as transações
    //para cada transação 
    Transaction.all.forEach(transaction => {
      //verificar se é maior que zero
      if (transaction.amount > 0) {
        //somar a uma variavel 
        income = income + transaction.amount;

      }
    })
    return income;
  },
  expenses() {
    let expense = 0;
    //pegar todas as transações
    //para cada transação 
    Transaction.all.forEach(transaction => {

      if (transaction.amount < 0) {

        expense += transaction.amount;
        const element = document.querySelector('.expense_itens')
        element.classList.add('active')
        //element.classList.remove('active')
        element.classList.toggle('ative')


      }
    })
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img onclick = "Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
    </td>
    `

    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },
  //como estava duplicando os dados
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}


const Utils = {
  formatAmount(value) {
    value = Number(value) * 100
    return value
  },

  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }

}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validadeFields() {
    const { description, amount, date } = Form.getValues()
    if (description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "") {
      throw new Error("Por favor preencha todos os campos!")
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)
    return {
      description,
      amount,
      date
    }
  },


  cleanFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },


  submit(event) {
    event.preventDefault()
    //verificar se todas as informações foi preenchida
    try {
      Form.validadeFields()
      //formatar os doados para salvar
      const transaction = Form.formatValues()
      //salvar

      Transaction.add(transaction)
      //apagar os dados do formulario
      Form.cleanFields()
      //modal feche
      Modal.close()


    } catch (error) {
      alert(error.message)
    }


  }
}


const App = {
  init() {
    Transaction.all.forEach(function (transaction, index) { // organizando
      DOM.addTransaction(transaction, index) // adicionando na DOM
    })

    DOM.updateBalance() // Atualizando

    Storage.set(Transaction.all) //Set nas informações

  },
  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()



// Dark

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) =>
  window
    .getComputedStyle(element)
    .getPropertyValue(style)

const initialColors = {
  bg: getStyle(html, "--bg"),
  colorHeadings: getStyle(html, "--color-headings"),
  colorText: getStyle(html, "--color-text"),
}

const darkMode = {
  bg: "#333333",
  colorHeadings: "#080808",
  colorText: "B5B5B5"
}

const transformKey = key =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
  Object.keys(colors).map(key => {

    html.style.setProperty(transformKey(key), colors[key])
  })
}

checkbox.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})


// Transição
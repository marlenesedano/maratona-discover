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

const transactions = [
  {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    description: 'Freela',
    amount: 1000000,
    date: '10/01/2021'
  },
  {
    description: 'Net',
    amount: -25000,
    date: '23/01/2021'
  },
]

const Transaction = {
  all: transactions,
  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index){
    Transaction.all.splice(index,1)
    App.reload()
  },

  incomes() {
    let income = 0;
    //pegar todas as transações
     //para cada transação 
    Transaction.all.forEach(transaction =>{
      //verificar se é maior que zero
      if(transaction.amount > 0){
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
     Transaction.all.forEach(transaction =>{
      
      if(transaction.amount < 0){
         
          expense += transaction.amount;
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
    <td class="description">${transaction.description}</td>
    <td class="${CSSclass }">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img src="./assets/minus.svg" alt="Remover Transação">
    </td>
    `
    return html
  },

  updateBalance(){
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
  clearTransactions(){
    DOM.transactionsContainer.innerHTML = ""
  }
}


const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g,"")
    value = Number(value) /100

    value = value.toLocaleString("pt-BR",{
      style:"currency",
      currency: "BRL"
    })

    return signal + value
  }
  
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance()
     
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

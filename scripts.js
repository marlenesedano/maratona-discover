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
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Freela',
    amount: 10000,
    date: '10/01/2021'
  },
  {
    id: 3,
    description: 'Net',
    amount: -25000,
    date: '23/01/2021'
  },
]

const Transaction = {
  incomes() {
    //pegar todas as transações
    //verificar se é maior que zero
    //se for maior que zero
    //somar a uma variavel 
    return "Cheguei"
  },
  expenses() {
    return "aqui"
  },
  total() {
    //entradas - saidas
    return "novamente"
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
    .innerHTML = Transaction.incomes()
    document
    .getElementById('expenseDisplay')
    .innerHTML = Transaction.expenses()
    document
    .getElementById('totalDisplay')
    .innerHTML = Transaction.total()
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

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})

DOM.updateBalance()

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
    //somar entradas 
  },
  expenses() {
    //somar as saidas
  },
  total() {
    //entradas - saidas
  }
}

const DOM = {
  innerHTMLTansaction() {
    const html = `
    <tr>
      <td class="description">Luz</td>
      <td class="expense">- R$500,00</td>
      <td class="date">23/01/2021</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover Transação" srcset="">
      </td>
    </tr>
    `
  }
}
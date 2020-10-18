// Variables
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// Update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

const removeTransaction = (id) => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" onClick="removeTransaction(${
      transaction.id
    })">x</button>
  `;

  list.appendChild(item);
}

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
}

// Update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1 ).toFixed(2);

  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expense}`;
}

// Add transactions to DOM list
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);

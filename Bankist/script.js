'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = movements => {
  // containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  const movements = acc.movements;
  const balance = movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
  acc.balance = balance;
};

const calcDisplaySummary = acc => {
  console.log(acc);
  const movements = acc.movements;
  console.log(movements);
  const incomes = movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  console.log(incomes);
  const outcomes = movements
    .filter(mov => {
      return mov < 0;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  const interest = movements
    .filter(mov => {
      return mov > 0;
    })
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((cur, i, arr) => {
      console.log(arr);
      return cur >= 1;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${outcomes}€`;
  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = user => {
  return user
    .toLowerCase()
    .split(' ')
    .map(name => {
      return name[0];
    })
    .join('');
};
accounts.forEach(account => {
  account.userName = createUserName(account.owner);
});

let currentAccount;
const updateUi = acc => {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  console.log('jello');
  console.log(inputLoginUsername.value);
  currentAccount = accounts.find(
    account => account.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  console.log(currentAccount.pin, inputLoginPin.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('ho gya login');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();
  updateUi(currentAccount);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recAcc = accounts.find(acc => {
    return acc.userName === inputTransferTo.value;
  });
  inputTransferAmount.value = inputTransferTo.value = '';
  // console.log(recAcc);
  // console.log(amount, recAcc, currentAccount.balance, recAcc.userName);
  if (
    amount > 0 &&
    recAcc &&
    amount <= currentAccount.balance &&
    recAcc?.userName !== currentAccount.userName
  ) {
    // console.log('Ho jaega');
    currentAccount.movements.push(-amount);
    recAcc.movements.push(amount);
    updateUi(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  console.log(
    inputCloseUsername.value === currentAccount.userName,
    Number(inputClosePin.value) === currentAccount.pin
  );
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log(
      inputCloseUsername.value === currentAccount.userName,
      Number(inputClosePin.value) === currentAccount.pin
    );
    const index = accounts.findIndex(acc => {
      return acc.userName === currentAccount.userName;
    });
    console.log(index);
    console.log(accounts);
    accounts.splice(index, 1);
    console.log(accounts);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
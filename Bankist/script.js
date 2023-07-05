'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const displayMovements = (acc, sort = false) => {
  const movements = acc.movements;
  containerMovements.innerHTML = '';
  const moves = sort
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;
  // containerMovements.innerHTML = '';
  moves.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const hour = `${date.getHours()}`.padStart(2, 0);
    const min = `${date.getMinutes()}`.padStart(2, 0);
    const displayDate = `${day}/${month}/${year}`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov.toFixed(2)}€</div>
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
  labelBalance.textContent = `${balance.toFixed(2)} EUR`;
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
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumOut.textContent = `${outcomes.toFixed(2)}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

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
    currentAccount.movementsDates.push(new Date().toISOString());
    recAcc.movementsDates.push(new Date().toISOString());
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

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

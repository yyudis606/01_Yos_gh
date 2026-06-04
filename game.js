const diceRow = document.getElementById('dice-row');
const betForm = document.getElementById('bet-form');
const betType = document.getElementById('bet-type');
const gameMode = document.getElementById('game-mode');
const betValueContainer = document.getElementById('bet-value-container');
const betAmount = document.getElementById('bet-amount');
const rollButton = document.getElementById('roll-button');
const withdrawButton = document.getElementById('withdraw-button');
const withdrawModal = document.getElementById('withdraw-modal');
const closeModal = document.getElementById('close-modal');
const resultPanel = document.getElementById('result');
const historyPanel = document.getElementById('history');
const balanceLabel = document.getElementById('balance');
const totalLabel = document.getElementById('total');

let balance = 1000;
const history = [];
const diceCount = 3;

function renderDice() {
  diceRow.innerHTML = '';
  for (let i = 0; i < diceCount; i += 1) {
    const die = document.createElement('div');
    die.className = 'dice';
    die.textContent = '1';
    die.id = `dice-${i + 1}`;
    diceRow.appendChild(die);
  }
}

function getDiceElements() {
  return Array.from(diceRow.children);
}

function createBetValueInput() {
  const minTotal = diceCount;
  const maxTotal = diceCount * 6;
  betValueContainer.innerHTML = '';

  if (betType.value === 'total') {
    betValueContainer.innerHTML = `
      <label>
        Pilih total (${minTotal}-${maxTotal})
        <input type="number" id="bet-value" min="${minTotal}" max="${maxTotal}" value="${Math.round((minTotal + maxTotal) / 2)}">
      </label>
    `;
  } else if (betType.value === 'parity') {
    betValueContainer.innerHTML = `
      <label>
        Pilih hasil
        <select id="bet-value">
          <option value="odd">Ganjil</option>
          <option value="even">Genap</option>
        </select>
      </label>
    `;
  } else {
    betValueContainer.innerHTML = `
      <label>
        Pilih triple
        <select id="bet-value">
          <option value="any">Triple apa saja</option>
          <option value="1">Triple 1</option>
          <option value="2">Triple 2</option>
          <option value="3">Triple 3</option>
          <option value="4">Triple 4</option>
          <option value="5">Triple 5</option>
          <option value="6">Triple 6</option>
        </select>
      </label>
    `;
  }
}

function updateBalance() {
  balanceLabel.textContent = balance;
}

function renderHistory() {
  historyPanel.innerHTML = '';
  history.slice(-6).reverse().forEach(entry => {
    const item = document.createElement('div');
    item.innerHTML = `
      <strong>${entry.status}</strong> — ${entry.message}
    `;
    historyPanel.appendChild(item);
  });
}

function rollDice(count) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
}

function generateWinningDice(type, betValue) {
  if (type === 'total') {
    const target = Number(betValue);
    const dice = [1, 1, 1];
    let remaining = target - 3;
    for (let i = 0; i < dice.length && remaining > 0; i += 1) {
      const add = Math.min(6 - dice[i], remaining);
      dice[i] += add;
      remaining -= add;
    }
    return dice;
  }

  if (type === 'parity') {
    return betValue === 'even' ? [1, 1, 2] : [1, 1, 3];
  }

  if (type === 'triple') {
    if (betValue === 'any') {
      return [2, 2, 2];
    }
    const value = Number(betValue);
    return [value, value, value];
  }

  return rollDice(diceCount);
}

function generateLosingDice(type, betValue) {
  if (type === 'total') {
    const target = Number(betValue);
    const losingTotal = target === diceCount ? target + 1 : diceCount;
    const dice = [1, 1, 1];
    let remaining = losingTotal - 3;
    for (let i = 0; i < dice.length && remaining > 0; i += 1) {
      const add = Math.min(6 - dice[i], remaining);
      dice[i] += add;
      remaining -= add;
    }
    return dice;
  }

  if (type === 'parity') {
    return betValue === 'even' ? [1, 1, 3] : [1, 1, 2];
  }

  if (type === 'triple') {
    if (betValue === 'any') {
      return [1, 1, 2];
    }
    const target = Number(betValue);
    if (target === 1) {
      return [2, 2, 3];
    }
    return [1, 1, 2];
  }

  return rollDice(diceCount);
}

function isTriple(values) {
  return values.length >= 3 && values.every(value => value === values[0]);
}

function getPayout(type, betValue, diceTotal, diceValues) {
  if (type === 'total') {
    return diceTotal === Number(betValue) ? 5 : 0;
  }

  if (type === 'parity') {
    const parity = diceTotal % 2 === 0 ? 'even' : 'odd';
    return parity === betValue ? 1 : 0;
  }

  if (type === 'triple') {
    if (!isTriple(diceValues)) return 0;
    if (betValue === 'any') return 8;
    return diceValues[0] === Number(betValue) ? 40 : 0;
  }

  return 0;
}

function showResult(resultText, win) {
  resultPanel.innerHTML = `<p>${resultText}</p>`;
  resultPanel.style.color = win ? '#7bef8d' : '#ff7c7c';
}

function getBetValue() {
  const betValue = document.getElementById('bet-value');
  return betValue ? betValue.value : null;
}

betType.addEventListener('change', createBetValueInput);
withdrawButton.addEventListener('click', () => {
  withdrawModal.classList.add('visible');
  withdrawModal.setAttribute('aria-hidden', 'false');
});

closeModal.addEventListener('click', () => {
  withdrawModal.classList.remove('visible');
  withdrawModal.setAttribute('aria-hidden', 'true');
});

withdrawModal.addEventListener('click', event => {
  if (event.target === withdrawModal) {
    withdrawModal.classList.remove('visible');
    withdrawModal.setAttribute('aria-hidden', 'true');
  }
});

createBetValueInput();
updateBalance();
renderHistory();

betForm.addEventListener('submit', event => {
  event.preventDefault();

  const amount = Number(betAmount.value);
  const type = betType.value;
  const value = getBetValue();

  const minTotal = diceCount;
  const maxTotal = diceCount * 6;

  if (!amount || amount <= 0) {
    showResult('Masukkan jumlah taruhan yang valid.', false);
    return;
  }

  if (amount > balance) {
    showResult('Saldo tidak cukup.', false);
    return;
  }

  if (type === 'total' && (Number(value) < minTotal || Number(value) > maxTotal)) {
    showResult(`Pilih total antara ${minTotal} dan ${maxTotal}.`, false);
    return;
  }

  balance -= amount;
  updateBalance();

  const mode = gameMode.value;
  let diceValues = rollDice(diceCount);
  if (mode === 'menang') {
    diceValues = generateWinningDice(type, value);
  } else if (mode === 'kalah') {
    diceValues = generateLosingDice(type, value);
  }

  let total = diceValues.reduce((sum, die) => sum + die, 0);
  let payoutMultiplier = getPayout(type, value, total, diceValues);

  if (mode === 'menang') {
    let attempts = 0;
    while (payoutMultiplier === 0 && attempts < 5) {
      diceValues = generateWinningDice(type, value);
      total = diceValues.reduce((sum, die) => sum + die, 0);
      payoutMultiplier = getPayout(type, value, total, diceValues);
      attempts += 1;
    }
  }

  if (mode === 'kalah') {
    let attempts = 0;
    while (payoutMultiplier > 0 && attempts < 5) {
      diceValues = generateLosingDice(type, value);
      total = diceValues.reduce((sum, die) => sum + die, 0);
      payoutMultiplier = getPayout(type, value, total, diceValues);
      attempts += 1;
    }
  }

  totalLabel.textContent = total;

  const diceElements = getDiceElements();
  diceElements.forEach((die, index) => {
    die.textContent = '';
    die.classList.add('rolling');
  });

  setTimeout(() => {
    diceElements.forEach((die, index) => {
      die.classList.remove('rolling');
      die.textContent = diceValues[index];
    });

    const win = payoutMultiplier > 0;
    const payout = amount * payoutMultiplier;
    let message;

    if (win) {
      balance += amount + payout;
      message = `Dadu: ${diceValues.join(', ')}. Total ${total}. Menang ${payout} koin! 🎉`;
    } else {
      message = `Dadu: ${diceValues.join(', ')}. Total ${total}. Kalah. 😌`;
    }

    updateBalance();
    showResult(message, win);

    history.push({
      status: win ? 'Menang' : 'Kalah',
      message,
    });
    renderHistory();
  }, 700);
});

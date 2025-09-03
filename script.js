let balance = 0;
let transactions = []; // array to store transaction history

balance_func();
renderTransactions(); // show initial message

// Deposit
document.getElementById("deposit-btn").addEventListener("click", deposit);
function deposit() {
    let amount = parseFloat(document.getElementById("deposit-amt").value);
    let depositError = document.getElementById('deposit-error');
    depositError.textContent = ''; // clear previous message

    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        document.getElementById('deposit-amt').value = '';
        balance_func();
        addTransaction('Deposit', amount);
    } else {
        depositError.textContent = 'Enter a valid deposit amount.';
    }
}

// Withdraw
document.getElementById("withdraw-btn").addEventListener("click", withdraw);
function withdraw() {
    let amount = parseFloat(document.getElementById("withdraw-amt").value);
    let withdrawError = document.getElementById('withdraw-error');
    withdrawError.textContent = ''; // clear previous message

    if (!isNaN(amount) && amount > 0) {
        if (amount <= balance) {
            balance -= amount;
            document.getElementById('withdraw-amt').value = '';
            balance_func();
            addTransaction('Withdraw', amount);
        } else {
            withdrawError.textContent = 'Insufficient balance.';
        }
    } else {
        withdrawError.textContent = 'Enter a valid withdraw amount.';
    }
}

// Update balance display
function balance_func() {
    let balance_text = document.getElementById("balance-txt");
    balance_text.textContent = `₹${balance.toFixed(2)}`;
}

// Add transaction to history
function addTransaction(type, amount) {
    const transaction = {
        type: type,
        amount: amount,
        date: new Date().toLocaleString()
    };
    transactions.unshift(transaction); // add to start of array
    renderTransactions();
}

// Render transaction list
function renderTransactions() {
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = '';

    if (transactions.length === 0) {
        transactionList.innerHTML = `<div class="text-center text-gray-500 py-4"><p>No transactions yet</p></div>`;
        return;
    }

    transactions.forEach(tx => {
        const div = document.createElement('div');
        div.classList.add('transaction-item', 'mb-2', 'p-2', 'border-b', 'border-gray-200');
        if (tx.type.toLowerCase() === 'deposit') {
            div.classList.add('deposit');
        } else if (tx.type.toLowerCase() === 'withdraw') {
            div.classList.add('withdraw');
        }
        div.innerHTML = `
            <strong>${tx.type}:</strong> ₹${tx.amount.toFixed(2)} 
            <span class="text-gray-500 text-sm">(${tx.date})</span>
        `;
        transactionList.appendChild(div);
    });
}

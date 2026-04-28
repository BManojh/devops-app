let transactions = JSON.parse(localStorage.getItem("data")) || [];

function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let balance = 0, income = 0, expense = 0;

    transactions.forEach((t, index) => {
        const li = document.createElement("li");

        li.classList.add(t.amount >= 0 ? "plus" : "minus");

        li.innerHTML = `
            ${t.text} - ₹${t.amount}
            <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
        `;

        list.appendChild(li);

        balance += Number(t.amount);

        if (t.amount >= 0) income += Number(t.amount);
        else expense += Number(t.amount);
    });

    document.getElementById("balance").innerText = balance;
    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = Math.abs(expense);

    localStorage.setItem("data", JSON.stringify(transactions));
}

function addTransaction() {
    const text = document.getElementById("text").value;
    const amount = document.getElementById("amount").value;

    if (!text || !amount) {
        alert("Enter valid data");
        return;
    }

    transactions.push({
        text,
        amount: Number(amount)
    });

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

function filterTransactions() {
    const search = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll("li");

    items.forEach((item) => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(search) ? "flex" : "none";
    });
}

// Initialize
updateUI();
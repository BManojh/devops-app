let transactions = JSON.parse(localStorage.getItem("data")) || [];

function save() {
    localStorage.setItem("data", JSON.stringify(transactions));
}

function updateUI(data = transactions) {
    let balance = 0, income = 0, expense = 0;
    let html = "";

    data.forEach((t, i) => {
        if (t.type === "income") {
            income += t.amount;
            balance += t.amount;
        } else {
            expense += t.amount;
            balance -= t.amount;
        }

        html += `
        <div class="card ${t.type}">
            <div>
                <b>${t.text}</b><br>
                <small>${t.category} | ${t.date}</small>
            </div>
            <div>
                ₹${t.amount}
                <button onclick="deleteTransaction(${i})">❌</button>
            </div>
        </div>`;
    });

    document.getElementById("balance").innerText = "Balance: ₹" + balance;
    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("list").innerHTML = html;
}

function addTransaction() {
    let t = {
        text: document.getElementById("text").value,
        amount: parseInt(document.getElementById("amount").value),
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value
    };

    if (!t.text || !t.amount) {
        alert("Enter valid data");
        return;
    }

    transactions.push(t);
    save();
    updateUI();
}

function deleteTransaction(i) {
    transactions.splice(i, 1);
    save();
    updateUI();
}

function filterData(type) {
    if (type === "all") return updateUI();
    let filtered = transactions.filter(t => t.type === type);
    updateUI(filtered);
}

updateUI();
let data = JSON.parse(localStorage.getItem("data")) || [];

function showSection(id) {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function addTransaction() {
    let text = document.getElementById("text").value;
    let amount = +document.getElementById("amount").value;

    if (!text || !amount) return alert("Enter details");

    data.push({ text, amount });
    localStorage.setItem("data", JSON.stringify(data));

    updateUI();
}

function updateUI() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let balance = 0, income = 0, expense = 0;

    data.forEach(t => {
        balance += t.amount;
        if (t.amount > 0) income += t.amount;
        else expense += t.amount;

        list.innerHTML += `<div class="card">${t.text} - ₹${t.amount}</div>`;
    });

    document.getElementById("balance").innerText = balance;
    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = Math.abs(expense);
}

updateUI();
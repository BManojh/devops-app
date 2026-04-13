const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
    let list = todos.map((t, i) => `<li>${t} <a href="/delete/${i}">❌</a></li>`).join('');
    
    res.send(`
        <h2>📝 Simple To-Do List</h2>
        <form method="POST" action="/add">
            <input type="text" name="task" required>
            <button type="submit">Add</button>
        </form>
        <ul>${list}</ul>
    `);
});

app.post('/add', (req, res) => {
    todos.push(req.body.task);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    todos.splice(req.params.id, 1);
    res.redirect('/');
});

app.listen(3000, () => console.log("Server running on port 3000"));
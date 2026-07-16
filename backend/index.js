
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Conexão com o banco de dados SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Cria a tabela de tasks se não existir
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela tasks:', err.message);
            } else {
                console.log('Tabela tasks verificada/criada com sucesso.');
            }
        });
    }
});

// Rotas da API (serão implementadas em sprints futuros)
app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/tasks', (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: 'A descrição da tarefa é obrigatória.' });
    }
    db.run('INSERT INTO tasks (description) VALUES (?)', [description], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json(row);
        });
    });
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { description, completed } = req.body;
    
    let updates = [];
    let params = [];

    if (description !== undefined) {
        updates.push('description = ?');
        params.push(description);
    }
    if (completed !== undefined) {
        updates.push('completed = ?');
        params.push(completed ? 1 : 0); // SQLite stores booleans as 0 or 1
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo para atualizar fornecido.' });
    }

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    params.push(id);

    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;

    db.run(sql, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Tarefa não encontrada.' });
            return;
        }
        db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(row);
        });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Tarefa não encontrada.' });
            return;
        }
        res.status(204).send();
    });
});


app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});


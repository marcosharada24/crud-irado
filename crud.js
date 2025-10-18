//npm init -y
//npm install express cors
//node crud.js



const express = require('express');
const cors = require('cors'); // <-- importa o cors
const app = express();
const port = 3000;

app.use(cors()); // <-- aplica CORS para todas as origens
app.use(express.json());


// Banco de dados em memória
let alunos = [
    { id: 1, nome: 'João', telefone: '123456789', idade: 20, turma: 'A' },
    { id: 2, nome: 'Maria', telefone: '987654321', idade: 22, turma: 'B' }
];

// Endpoints CRUD

// 1. Criar aluno
app.post('/alunos', (req, res) => {
    const { nome, telefone, idade, turma } = req.body;
    if (!nome || !telefone || !idade || !turma) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const newAluno = {
        id: alunos.length + 1,
        nome,
        telefone,
        idade,
        turma
    };

    alunos.push(newAluno);
    res.status(201).json(newAluno);
});

// 2. Listar todos os alunos
app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});

// 3. Buscar aluno por ID
app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
});

// 4. Atualizar aluno
app.put('/alunos/:id', (req, res) => {
    const { nome, telefone, idade, turma } = req.body;
    const alunoIndex = alunos.findIndex(a => a.id === parseInt(req.params.id));
    if (alunoIndex === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    alunos[alunoIndex] = { id: parseInt(req.params.id), nome, telefone, idade, turma };
    res.status(200).json(alunos[alunoIndex]);
});

// 5. Deletar aluno
app.delete('/alunos/:id', (req, res) => {
    const alunoIndex = alunos.findIndex(a => a.id === parseInt(req.params.id));
    if (alunoIndex === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    alunos.splice(alunoIndex, 1);
    res.status(200).json({ message: 'Aluno deletado com sucesso' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const clientesfile = path.join(__dirname, "clientes.json")

function salvarCliente(clientes) {
    fs.writeFileSync(clientesfile, JSON.stringify(clientes, null, 2), "utf-8")
}

function LerClientes() {
    if (!fs.existsSync(clientesfile)) {
        return [];
    }
    const dados = fs.readFileSync(clientesfile, "utf-8")
    try {
        return JSON.parse(dados) || [];
    }
    catch (e) {
        return [];
    }
}

app.post("/clientes", (req, res) => {
    const { nome, cpf, cep, rua, cidade, estado, numero } = req.body;
    if (!nome || !cpf || !cep) {
        return res.status(404).json({ erro: "dados incompletos" })
    }
    const clientes = LerClientes();
    if (clientes.some(c => c.cpf === cpf)) {
        return res.status(400).json({ erro: "cliente já cadastrado" })
    }
    const novoCliente = { nome, cpf, cep, rua, cidade, estado, numero };
    clientes.push(novoCliente);
    salvarCliente(clientes);
    return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" })
})
////
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(404).json({ erro: "dados incompletos" })
    }
    const usuario = lerUsuario();
    if (usuario.some(s => s.senha === senha && s.email === email)) {
        return res.status(400).json({ erro: "usuario ja cadastrado" })
    }
    const novoUsuario = { nome, email, senha, };
    usuario.push(novoUsuario);
    salvarUsuario(usuario);
    return res.status(201).json({ mensagem: "usuario cadastrado com sucesso", token: "123456" })
})
const usuarioFile = path.join(__dirname, "usuario.json")

function salvarUsuario(usuario) {
    fs.writeFileSync(usuarioFile, JSON.stringify(usuario, null, 2), "utf8")
}

function lerUsuario() {
    if (!fs.existsSync(usuarioFile)) {
        return [];
    }
    const dados = fs.readFileSync(usuarioFile, 'utf-8')
    try {
        return JSON.parse(dados) || [];
    }
    catch (e) {
        return []
    }
}


//http://localhost:3000/saudacao?nome=maria
app.get("/saudacao", (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(404).json(
            {
                erro: "Nome não informado"
            }
        )
    }
    res.json(
        {
            mensagem: `Saudações ${nome}!`
        }
    )

})

app.post("/cadastrarCliente", (req, res) => {
    const { nome, cpf, cep } = req.body;

    if (!nome || !cpf || !cep) {
        return res.status(404).json({ erro: "Dados incompletos" })
    }
    res.json({
        nome,
        cpf,
        cep
    })

})


app.post("/media", (req, res) => {
    const { nota1, nota2 } = req.body;

    if (!nota1 || !nota2) {
        return res.status(404).json({ erro: "Dados incompletos" })
    }

    const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;
    res.json({
        nota1,
        nota2,
        mensagem: media >= 7 ? "Aprovado" : "Reprovado",
        media: parseFloat(media)
    })

})


app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json({ erro: "Dados incompletos!" })
    }

    const usuarios = lerUsuario();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        return res.json({
            mensagem: "Login realizado com sucesso!",
            token: "123456"


        })
    } else {
        return res.status(401).json({ erro: "Usuário ou senha inválidos!" })
    }
})

//final
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
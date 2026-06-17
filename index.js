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
    fs.writeFileSync(clientesfile, JSON.stringify(clientes, null, 2), "utf8")
}

app.post("/clientes", (req, res) =>{
    const {nome, cpf, cep, rua, cidade, estado, numero}= req.body;
    if(!nome || !cpf || !cep){
        return res.status(404).json({erro: "dados incompletos"})
    }
    const clientes = LerClientes();
    if(clientes.some(c => c.cpf === cpf)){
        return res.status(400).json({erro: "cliente já cadastrado"})
    }
    const novoCliente = {nome, cpf, cep, rua, cidade, estado, numero};
    clientes.push(novoCliente);
    salvarCliente(clientes);
     return res.status(201).json({mensagem: "Cliente cadastrado com sucesso!"})
})

function LerClientes() {
    if (!fs.existsSync(clientesfile)) {
    }}

//http://localhost:3000/saudacao?nome=maria
app.get("/saudacao", (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(404).json(
            {
                erro: "Nome não foi informado"
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
//final
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
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
//final
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json({ erro: "Dados incompletos!" })
    }



    if (email === "admin@admin.com" && senha === "123456") {
        return res.json({
            email,
            senha,
            token: "123456"
        })
    }
    else {
        return res.status(404).json({ erro: "Credenciais inválidas!" })
    }
})
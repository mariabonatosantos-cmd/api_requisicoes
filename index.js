const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


//http://localhost:3000/saudacao?nome=maria
app.get("/saudacao", (req, res)=>{
    const nome = req.query.nome;
    if(!nome) {
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
    const {nome, cpf, cep} = req.body;

    if(!nome || !cpf || !cep){
       return res.status(404).json({erro: "Dados incompletos"}) 
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
    const {nota1, nota2} = req.body;

    if(!nota1 || !nota2){
       return res.status(404).json({erro: "Dados incompletos"}) 
    }

    const media = (parseFloat(nota1) + parseFloat(nota2))/ 2;
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
    const {email, senha} = req.body;

    if(!email || !senha){
        return res.status(404).json({erro: "Dados incompletos!"})
    }



       if (email === "admin@admin.com" && senha === "123456")
       {
        return res.json({
            email,
            senha,
            token: "123456"
        })
       }
         else {
            return res.status(404).json({erro: "Credenciais inválidas!"})
         }
})
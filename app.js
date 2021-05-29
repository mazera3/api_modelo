const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();
// https://celke.com.br/artigo/consumir-dados-da-api-propria-com-react
app.use(express.json());
app.use((req, res, next) => {
    // console.log("Acessou do Middleware!");
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    next();
    app.use(cors());
});

// no linux:
// Veirificar estado:  sudo systemctl status mongod
// Iniciar o mongodb: sudo systemctl start mongod.service
// Parar o mongodb: sudo systemctl stop mongod.service

mongoose.connect('mongodb://localhost/celke', { // nodejs:qwe123456@mongo_celke:27017/celke
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});
// listar todos os rtigos
app.get("/artigo", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});
// Visualizar um artigo
//id = "60ae61b7d10295550fa903ea"
app.get("/artigo/:id", (req, res) => {
    //console.log(req.params.id);
    //return res.json({id:req.params.id});
    Artigo.findOne({
        _id: req.params.id
    }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});
// editar um artigo
//id = "60ae61b7d10295550fa903ea"
app.put("/artigo/:id", (req, res) => {
    Artigo.updateOne({
        _id: req.params.id
    }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: artigo não editado!"
        });
        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        });
    });
});
// excluir um artigo
//id = "60ae61b7d10295550fa903ea"
app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({
        _id: req.params.id
    }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: artigo não excluido!"
        });
        return res.json({
            error: false,
            message: "Artigo excluido com sucesso!"
        });
    });
});
// cadastrar um artigo via get
//id = "60ae61b7d10295550fa903ea"
app.get('/cad-artigo', function (req, res) {
    new Artigo({
        titulo: 'Internet 3',
        conteudo: "O conteudo 3 vai aqui ..."
    }).save().then(() => {
        res.send('Artigo cadastrado com sucesso !')
    }).catch((erro) => {
        res.send('Erro. Artigo não cadastrado:' + erro)
    })
})
// cadastrar um artigo via post
app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        console.log(req.body);
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });

        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    });
});
/*
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App rodando na porta %s', port);
});
*/

app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8081: http://localhost:8081/");
});
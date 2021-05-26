const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artigo = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('artigo', Artigo);
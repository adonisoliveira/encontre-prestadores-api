const mongoose = require('mongoose')

const ProblemaSchema = new mongoose.Schema({
    tipoDispositivo: {
        type: Number,
        enum: [
            1,
            2,
            3
        ],
        default: 1
    },
    sistemaOperacional: {
        type: Number,
        enum: [
            1,
            2,
            3,
            4,
            5
        ],
        default: 1
    },
    tipoRede: {
        type: Number,
        enum: [
            1,
            2
        ],
        default: 1
    },
    descricao: {
        type: String,
        require: true
    },
    idUsuario: {
        type: String
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
        require: true
    }
},
{
    collection: 'problemas'
})

module.exports = exports = mongoose.model('Problema', ProblemaSchema)

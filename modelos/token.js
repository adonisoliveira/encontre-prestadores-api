const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    idPessoa: {
        type: String,
        require: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
        require: true
    }
},
{
    collection: 'tokens'
})

module.exports = exports = mongoose.model('Token', TokenSchema)

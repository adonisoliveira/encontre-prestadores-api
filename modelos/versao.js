const mongoose = require('mongoose')

const VersaoSchema = new mongoose.Schema({
    versao: {
        type: String,
        require: true,
        default: '1.0'
    }
},
{
    collection: 'versoes'
})

module.exports = exports = mongoose.model('Versao', VersaoSchema)

const mongoose = require('mongoose')

const DetalhesSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true
    },
    situacao: {
        type: String,
        enum: [
            'A',
            'I',
        ],
        default: 'A'
    }
})

const SubCategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    requerEndereco: {
        type: Boolean
    },
    podeSerVirtual: {
        type: Boolean
    },
    tags: [
        {
            type: String
        }
    ],
    descricaoDetalhe1: {
        type: String
    },
    detalhes1: {
        descricao: {
            type: String
        },
        multiselecao: {
            type: Boolean
        },
        itens: [DetalhesSchema]
    },
    detalhes2: {
        descricao: {
            type: String
        },
        multiselecao: {
            type: Boolean
        },
        itens: [DetalhesSchema]
    },
    detalhes3: {
        descricao: {
            type: String
        },
        multiselecao: {
            type: Boolean
        },
        itens: [DetalhesSchema]
    },
    detalhes4: {
        descricao: {
            type: String
        },
        multiselecao: {
            type: Boolean
        },
        itens: [DetalhesSchema]
    },
    detalhes5: {
        descricao: {
            type: String
        },
        multiselecao: {
            type: Boolean
        },
        itens: [DetalhesSchema]
    },
    detalhes6: {
        descricao: {
            type: String
        },
        multiselecao: {
            type: Boolean
        },
        itens: [DetalhesSchema]
    },
    situacao: {
        type: String,
        enum: [
            'A',
            'I',
        ],
        default: 'A'
    }
})

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    icone: {
        type: String
    },
    situacao: {
        type: String,
        enum: [
            'A',
            'I',
        ],
        default: 'A'
    },
    subCategorias: [SubCategoriaSchema]
},
{
    collection: 'categorias'
})

module.exports = exports = mongoose.model('Categoria', CategoriaSchema)

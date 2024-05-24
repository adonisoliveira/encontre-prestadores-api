const mongoose = require('mongoose')

const PessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    descricao: {
        type: String
    },
    usuario: {
        type: String,
        require: true,
        unique: true
    },
    senha: {
        type: String,
        uppercase: true,
        require: true
    },
    email: {
        type: String
    },
    prestador: {
        type: Boolean,
        require: true
    },
    endereco: {
        logradouro: {
            type: String
        },
        complemento: {
            type: String
        },
        numero: {
            type: String
        },
        bairro: {
            type: String
        },
        cep: {
            type: String
        },
        ibge: {
            type: Number,
            require: true
        },
        cidade: {
            type: String,
            require: true
        },
        uf: {
            type: String,
            uppercase: true,
            require: true
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    contatos: [
        {
            numero: {
                type: String,
                require: true
            },
            whatsapp: {
                type: Boolean
            }
        }
    ],
    categorias: [
        {
            _id: {
                type: String
            }
        }
    ],
    dadosCobranca: {
        dataVencimento: {
            type: Date
        }
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    tokenNotificacao: {
        type: String
    },
    situacao: {
        type: String,
        enum: [
            'A',
            'I'
        ],
        default: 'A'
    },
    avaliacoes: [
        {
            nome: {
                type: String,
                require: true
            },
            nota: {
                type: Number,
                require: true
            },
            descricao: {
                type: String,
                require: true
            },
            dataCadastro: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{
    collection: 'pessoas'
})

module.exports = exports = mongoose.model('Pessoa', PessoaSchema)

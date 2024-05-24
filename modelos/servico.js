const mongoose = require('mongoose')

const ServicoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
        require: true
    },
    tipo: {
        type: String,
        enum: [
            'S',
            'O'
        ],
        default: 'S'
    },
    virtual: {
        type: Boolean
    },
    inicioTrabalho: {
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
    idCategoria: {
        type: String,
        require: true
    },
    idSubCategoria: {
        type: String,
        require: true
    },
    detalhes1: {
        descricao: {
            type: String,
            require: true
        },
        itens: [
            {
                descricao: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    detalhes2: {
        descricao: {
            type: String,
            require: true
        },
        itens: [
            {
                descricao: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    detalhes3: {
        descricao: {
            type: String,
            require: true
        },
        itens: [
            {
                descricao: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    detalhes4: {
        descricao: {
            type: String,
            require: true
        },
        itens: [
            {
                descricao: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    detalhes5: {
        descricao: {
            type: String,
            require: true
        },
        itens: [
            {
                descricao: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    detalhes6: {
        descricao: {
            type: String,
            require: true
        },
        itens: [
            {
                descricao: {
                    type: String,
                    require: true
                }
            }
        ]
    },
    idContratante: {
        type: String,
        require: true
    },
    endereco: {
        ibge: {
            type: Number,
            require: true
        },
        uf: {
            type: String,
            uppercase: true,
            require: true
        }
    },
    idContratado: {
        type: String,
        require: true
    },
    candidatos: [
        {
            _id: {
                type: String,
                require: true
            }
        }
    ],
    situacao: {
        type: String,
        enum: [
            'A',
            'F'
        ],
        default: 'A'
    }
},
{
    collection: 'servicos'
})

module.exports = exports = mongoose.model('Servico', ServicoSchema)

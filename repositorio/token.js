const Token = require('../modelos/token')

function buscar(filtro, limit, skip) {
    let query = {}

    if (filtro.idPessoa !== undefined && filtro.idPessoa !== null && filtro.idPessoa !== '') {
        query.idPessoa = { $regex: filtro.idPessoa, $options: 'i' }
    }

    return Token.find(query)
        .then(tokens => {
            return { status: 200, dados: tokens }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function buscarPorPessoa(idPessoa) {
    if (idPessoa !== undefined && idPessoa !== null && idPessoa !== '') {
        return Token.findOne({ idPessoa: idPessoa })
            .then(token => {
                if (token !== null) {
                    return { sucesso: true, dados: token }
                } else {
                    return { sucesso: false, dados: "Token não encontrado." }
                }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } else {
        return { sucesso: false, dados: "Nenhuma pessoa informada." }
    }

}

function buscarPorId(id) {
    if (id !== undefined && id !== null && id !== '') {
        return Token.findById(id)
            .then(token => {
                if (token !== null) {
                    return { sucesso: true, dados: token }
                } else {
                    return { sucesso: false, dados: "Token não encontrado." }
                }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } else {
        return { sucesso: false, dados: "Nenhum token informado." }
    }
}

function inserir(idPessoa, semCadastro) {
    if ((idPessoa !== undefined && idPessoa !== null && idPessoa !== '') || semCadastro) {
        let token = {}
        if (!semCadastro) {
            token.idPessoa = idPessoa
        }
        return Token.create(token)
            .then(novoToken => {
                return { sucesso: true, dados: novoToken }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } else {
        return { sucesso: false, dados: "Nenhuma pessoa informada." }
    }
}

function alterar(id, token) {
    return Token.findByIdAndUpdate({ _id: id }, token)
        .then(token => {
            return { status: 200, dados: token }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function deletar(id) {
    if (id !== undefined && id !== null && id !== '') {
        return Token.findByIdAndRemove(id)
            .then(token => {
                if (token !== null) {
                    return { sucesso: true, dados: "Token deletado com sucesso" }
                } else {
                    return { sucesso: false, dados: "Token não encontrado." }
                }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } else {
        return { sucesso: false, dados: "Nenhum token informado." }
    }
}

module.exports = exports = { inserir, alterar, deletar, buscarPorId, buscarPorPessoa, buscar }
const Versao = require('../modelos/versao')

function buscar() {
    return Versao.find()
        .then(versoes => {
            if (versoes !== undefined && versoes !== null) {
                return { sucesso: true, dados: versoes[0] }
            } else {
                return { sucesso: false, dados: "Nenhuma versão encontrada." }
            }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })
}

function inserir() {
    return Versao.create({})
        .then(novaVersao => {
            return { sucesso: true, dados: novaVersao }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })

}

module.exports = exports = { buscar, inserir }
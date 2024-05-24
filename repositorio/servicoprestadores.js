const Servico = require('../modelos/servico')

function inserir(idServico, prestador) {
    if (idServico !== undefined && idServico !== null && idServico !== '') {
        if (prestador._id !== undefined && prestador._id !== null && prestador._id !== '') {
            return Servico.findById({ "_id": idServico })
                .then(servico => {
                    //Se possui no maximo 2 candidatos pode adicionar (Maximo 3)
                    if (servico.candidatos.length <= 2) {
                        let add = true

                        //Verifica se está tentando inserir um prestador que já é candidato
                        for (let i = 0; i < servico.candidatos.length; i++) {
                            if (servico.candidatos[i]._id === prestador._id) {
                                add = false
                                break
                            }
                        }

                        if (add === true) {
                            let novoPrestador = servico.candidatos.push({
                                _id: prestador._id
                            });

                            let retorno = {
                                _id: servico._id,
                                idContratante: servico.idContratante,
                                idPrestador: prestador._id
                            }

                            servico.save();
                            return { sucesso: true, dados: retorno }
                        } else {
                            return { sucesso: false, dados: "O prestador já é candidato." }
                        }
                    } else {
                        return { sucesso: false, dados: "Este serviço não está mais disponível." }
                    }
                })
                .then((retorno) => {
                    return retorno
                })
                .catch(err => {
                    return { sucesso: false, dados: err }
                })
        } else {
            return { sucesso: false, dados: "Nenhum prestador informado." }
        }
    } else {
        return { sucesso: false, dados: "Nenhum serviço informado." }
    }
}

function deletar(idServico, idPrestador) {
    if (idServico !== undefined && idServico !== null && idServico !== '') {
        if (idPrestador !== undefined && idPrestador !== null && idPrestador !== '') {
            return Servico.findById({ "_id": idServico })
                .then(servico => {
                    servico.candidatos.id(idPrestador).remove();
                    servico.save();
                    return { sucesso: true, dados: "Registro deletado com sucesso." }
                })
                .then((resultado) => {
                    return resultado
                })
                .catch(err => {
                    return { sucesso: false, dados: err }
                })
        } else {
            return { sucesso: false, dados: "Nenhum prestador informado." }
        }
    } else {
        return { sucesso: false, dados: "Nenhum serviço informado." }
    }
}

module.exports = exports = { 
    inserir, 
    deletar 
}
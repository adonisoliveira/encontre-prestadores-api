const Servico = require('../modelos/servico')

function buscar(filtro)
{
    //////////////////////////////////////////////////////////////////
    //FILTROS
    let query = {}

    if (!!filtro?.idContratante)
        query.idContratante = { $regex: filtro.idContratante, $options: 'i' }

    if (!!filtro?.idContratado)
        query.idContratado = { $regex: filtro.idContratado, $options: 'i' }

    if (!!filtro?.idCandidato)
    {
        Object.defineProperty(query, 'candidatos._id', {
            value: filtro.idCandidato,
            writable: true,
            enumerable: true,
            configurable: true
        })
    }

    if (!!filtro?.situacao)
        query.situacao = { $regex: filtro.situacao, $options: 'i' }

    if (!!filtro?.idCategoria)
        query.idCategoria = filtro.idCategoria

    if (!!filtro?.idSubCategoria)
    {
        query.idSubCategoria = { $in: filtro.idSubCategoria }

        if (query.idCategoria)
            delete query.idCategoria

        //Busca os serviços que não sou o contratante
        if (query.idContratante)
            query.idContratante = { $ne: filtro.idContratante }
    }

    if (!!filtro?.ibge)
    {
        Object.defineProperty(query, 'endereco.ibge', {
            value: parseFloat(filtro.ibge),
            writable: true,
            enumerable: true,
            configurable: true
        })
    }

    if (!!filtro?.uf)
    {
        Object.defineProperty(query, 'endereco.uf', {
            value: { $regex: filtro.uf, $options: 'i' },
            writable: true,
            enumerable: true,
            configurable: true
        })
    }

    //////////////////////////////////////////////////////////////////
    //SELECIONA OS CAMPOS QUE RETORNARAM NA PESQUISA
    let camposRetornados = {}
    if (filtro.tipoRetorno == 1)
    { //retorno para listagem de servicos disponíveis
        camposRetornados.idCategoria = 1
        camposRetornados.idSubCategoria = 1
        camposRetornados.dataCadastro = 1
        camposRetornados.situacao = 1
        camposRetornados.candidatos = 1

        //Filtra somente os serviços que não sou candidato
        Object.defineProperty(query, 'candidatos._id', {
            value: { $ne: filtro.idContratante },
            writable: true,
            enumerable: true,
            configurable: true
        })

        //Se é pesquisa de serviços disponíveis, retorna somente os que tem menos que 3
        Object.defineProperty(query, '', {
            value: { $ne: filtro.idContratante },
            writable: true,
            enumerable: true,
            configurable: true
        })
    } 
    else
    {
        //retorno para listagem de servicos candidatados e contratados
        if (filtro.tipoRetorno == 2) 
        { 
            camposRetornados.idCategoria = 1
            camposRetornados.idSubCategoria = 1
            camposRetornados.dataCadastro = 1
            camposRetornados.idContratado = 1
            camposRetornados.candidatos = 1
            camposRetornados.situacao = 1
        } 
        else 
        {
            //retorno para listagem de servicos solicitados
            if (filtro.tipoRetorno == 3) 
            { 
                camposRetornados.idCategoria = 1
                camposRetornados.idSubCategoria = 1
                camposRetornados.dataCadastro = 1
                camposRetornados.idContratado = 1
                camposRetornados.candidatos = 1
                camposRetornados.situacao = 1
            }
        }
    }

    //////////////////////////////////////////////////////////////////
    //PESQUISA
    return Servico.find(query, camposRetornados)
        .then(servicos => {
            if (servicos !== null) 
            {
                if (filtro.tipoRetorno == 1) 
                {
                    let novaLista = []
                    for (let i = 0; i < servicos.length; i++) 
                    {
                        if (servicos[i].candidatos.length <= 2)
                            novaLista.push(servicos[i])
                    }

                    return { sucesso: true, dados: novaLista }
                } 
                else
                    return { sucesso: true, dados: servicos }
            } 
            else
                return { sucesso: false, dados: "Nenhum serviço encontrado." }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })
}

function buscarPorId(id)
{
    if (!!id)
    {
        return Servico.findById(id)
            .then(servico => {
                if (servico !== null)
                    return { sucesso: true, dados: servico }
                else
                    return { sucesso: false, dados: "Serviço não encontrado." }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhum serviço informado." }
}

function inserir(servico)
{
    if (servico.idCategoria !== undefined && servico.idCategoria !== null && servico.idCategoria !== '') {
        if (servico.idSubCategoria !== undefined && servico.idSubCategoria !== null && servico.idSubCategoria !== '') {
            if (servico.idContratante !== undefined && servico.idContratante !== null && servico.idContratante !== '') {
                if (servico.endereco !== undefined && servico.endereco !== null && servico.endereco.ibge !== undefined && servico.endereco.ibge !== null && servico.endereco.ibge > 0) {
                    if (servico.detalhes1.descricao !== undefined && servico.detalhes1.descricao !== null && servico.detalhes1.descricao !== '') {
                        if (servico.detalhes1.itens !== undefined && servico.detalhes1.itens !== null && servico.detalhes1.itens.length > 0) {
                            return Servico.create(servico)
                                .then(novoServico => {
                                    return { sucesso: true, dados: novoServico }
                                })
                                .catch(err => {
                                    return { sucesso: false, dados: err }
                                })
                        } else {
                            return { sucesso: false, dados: "As informações de detalhe do serviço não foram informadas." }
                        }
                    } else {
                        return { sucesso: false, dados: "A descrição do serviço não foi informada." }
                    }
                } else {
                    return { sucesso: false, dados: "Os dados da cidade do serviço não foram informados." }
                }
            } else {
                return { sucesso: false, dados: "O contratante não foi informado." }
            }
        } else {
            return { sucesso: false, dados: "A subcategoria não foi informada." }
        }
    } else {
        return { sucesso: false, dados: "A categoria não foi informada." }
    }
}

function alterar(id, servico)
{
    if (id !== undefined && id !== null && id !== '')
    {
        return Servico.findByIdAndUpdate({ _id: id }, servico)
            .then(servico => {
                if (servico !== null)
                    return { sucesso: true, dados: servico }
                else
                    return { sucesso: false, dados: "Serviço não alterado." }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhum serviço informado." }
}

function deletar(id)
{
    if (id !== undefined && id !== null && id !== '')
    {
        return Servico.findByIdAndRemove(id)
            .then(servico => {
                if (servico !== null)
                    return { sucesso: true, dados: "Serviço deletado com sucesso." }
                else
                    return { sucesso: false, dados: "Serviço não encontrado." }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhum serviço informado." }
}

module.exports = exports = { inserir, alterar, deletar, buscarPorId, buscar }
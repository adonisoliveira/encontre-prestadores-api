const Categoria = require('../modelos/categoria')

function buscar(filtro)
{
    let query = {}

    if (!!filtro?.nome)
        query.nome = { $regex: filtro.nome, $options: 'i' }

    if (!!filtro?.situacao)
        query.situacao = { $regex: filtro.situacao, $options: 'i' }

    return Categoria.find(query)
        .then(categorias => {
            return { 
                sucesso: true, 
                dados: categorias 
            }
        })
        .catch(err => {
            return { 
                sucesso: false, 
                dados: err 
            }
        })
}

function buscarPorId(id)
{
    if(!!id)
    {
        return Categoria.findById(id)
            .then(categoria => {
                if(categoria !== null)
                    return {
                        sucesso: true, 
                        dados: categoria 
                    }
        
                return {
                    sucesso: false,
                    dados: "Nenhuma categoria encontrada."
                }
            })
            .catch(err => {
                return {
                    sucesso: false, 
                    dados: err 
                }
            })
    }
    else
    {
        return { 
            sucesso: false, 
            dados: "Nenhuma categoria informada." 
        }
    }
}

function inserir(categoria)
{
    if (categoria !== undefined && categoria !== null)
    {
        return Categoria.create(categoria)
            .then(categoria => {
                return { 
                    sucesso: true, 
                    dados: categoria 
                }
            })
            .catch(err => {
                return { 
                    sucesso: true, 
                    dados: err 
                }
            })
    } 
    else 
        return { 
            sucesso: false, 
            dados: "Bad request." 
        }
}


function alterar(id, categoria)
{
    if (categoria.nome === undefined || categoria.nome === null || categoria.nome === '')
        delete categoria.nome

    if (categoria.icone === undefined || categoria.icone === null || categoria.icone === '')
        delete categoria.icone

    if (categoria.situacao === undefined || categoria.situacao === null || categoria.situacao === '')
        delete categoria.situacao

    return Categoria.findByIdAndUpdate({ _id: id }, categoria)
        .then(categoria => {
            return { 
                status: 200, 
                dados: categoria 
            }
        })
        .catch(err => {
            return { 
                status: 500, 
                dados: err 
            }
        })
}

function deletar(id) 
{
    if (!!id)
    {
        return Categoria.findByIdAndRemove(id)
            .then(categoria => {
                if (categoria !== null)
                    return { 
                        sucesso: true, 
                        dados: "Categoria deletada com sucesso" 
                    }
                else
                    return { 
                        sucesso: false, 
                        dados: "Categoria não encontrada." 
                    }
            })
            .catch(err => {
                return { 
                    status: 500, 
                    dados: err 
                }
            })
    } 
    else
        return { 
            sucesso: false, 
            dados: "Nenhuma categoria informada." 
        }
}

module.exports = exports = { 
    inserir, 
    alterar, 
    deletar, 
    buscarPorId, 
    buscar 
}
const Pessoa = require('../modelos/pessoa')

function nota(notas) 
{
    let totalViagens = 0
    let totalPontos = 0

    //Percorre as notas e pega somente as iguais
    for (let a = 0; a < notas.length; a++)
    {
        totalPontos += notas[a].nota
        totalViagens += 1
    }

    if (totalPontos > 0 && totalViagens > 0)
        return totalPontos / totalViagens

    return 0
}

function buscarNota(idPessoa)
{
    if (idPessoa !== undefined && idPessoa !== null && idPessoa !== '')
    {
        return Pessoa.findById(idPessoa)
            .then(pessoa => {
                if (pessoa !== null)
                {
                    let notaPessoa = nota(pessoa.avaliacoes)
                    return { sucesso: true, dados: notaPessoa }
                } 
                else
                    return { sucesso: false, dados: "Pessoa não encontrada." }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhuma pessoa informada." }
}

function buscar(idPessoa) 
{
    if (idPessoa !== undefined && idPessoa !== null && idPessoa !== '')
    {
        return Pessoa.findById(idPessoa)
            .then(pessoa => {
                if (pessoa !== null) 
                {
                    let notaPessoa = nota(pessoa.avaliacoes)
                    return { sucesso: true, dados: { nota: notaPessoa, avaliacoes: pessoa.avaliacoes } }
                }
                else
                    return { sucesso: false, dados: "Pessoa não encontrada." }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhuma pessoa informada." }
}

function inserir(idPessoa, avaliacao) 
{
    if (avaliacao.nome !== undefined && avaliacao.nome !== null && avaliacao.nome !== '') 
    {
        if (avaliacao.descricao !== undefined && avaliacao.descricao !== null && avaliacao.descricao !== '')
        {
            if (avaliacao.nota !== undefined && avaliacao.nota !== null && avaliacao.nota > 0)
            {
                if (idPessoa !== undefined && idPessoa !== null && idPessoa !== '')
                {
                    return Pessoa.findById({ _id: idPessoa })
                        .then(pessoa => {
                            if (pessoa !== undefined && pessoa !== null) {
                                if (pessoa.avaliacoes === undefined || pessoa.avaliacoes === null)
                                    pessoa.avaliacoes = []

                                let novaAvaliacao = pessoa.avaliacoes.push(avaliacao)
                                pessoa.save();
                                return { sucesso: true, dados: "Avaliação inserida com sucesso." }
                            }
                            else
                                return { sucesso: false, dados: "Problemas ao encontrar pessoa." }
                        })
                        .catch(err => {
                            return { sucesso: false, dados: err }
                        })
                } 
                else
                    return { sucesso: false, dados: "A pessoa não foi informada." }
            } 
            else
                return { sucesso: false, dados: "A nota não foi informada." }
        } 
        else
            return { sucesso: false, dados: "A descrição não foi informada." }
    } 
    else
        return { sucesso: false, dados: "O nome não foi informado." }
}

module.exports = exports = { 
    inserir, 
    buscar, 
    buscarNota 
}
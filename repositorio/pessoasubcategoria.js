const Pessoa = require('../modelos/pessoa')

function inserir(idpessoa, subcategoria)
{
    return Pessoa.findById({ _id: idpessoa })
        .then(pessoa => {
            if (pessoa !== undefined && pessoa !== null)
            {
                if (pessoa.categorias !== undefined && pessoa.categorias !== null)
                {
                    let novaCategoria = pessoa.categorias.push(subcategoria)
                    pessoa.save()
                    novaCategoria -= 1

                    return { status: 200, dados: pessoa.categorias[novaCategoria] }
                } 
                else
                    return { status: 200, dados: null }
            } 
            else
                return { status: 200, dados: null }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function deletar(idpessoa, id)
{
    return Pessoa.findById(idpessoa)
        .then(pessoa => {
            pessoa.categorias.id(id).remove()
            pessoa.save()

            return { status: 200, dados: pessoa ? "Categoria deletada com sucesso" : "Categoria não encontrada" }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

module.exports = exports = { 
    inserir, 
    deletar 
}
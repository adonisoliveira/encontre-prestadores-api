const Categoria = require('../modelos/categoria')

function buscar(idCategoria, filtro, limit, skip) {
    let query = {}

    if (idCategoria !== undefined && idCategoria !== null && idCategoria !== '') {
        query._id = idCategoria
    }

    if (filtro.nomeCategoria !== undefined && filtro.nomeCategoria !== null && filtro.nomeCategoria !== '') {
        query.nome = { $regex: filtro.nomeCategoria, $options: 'i' }
    }

    if (filtro.idSubCategoria !== undefined && filtro.idSubCategoria !== null && filtro.idSubCategoria !== '') {
        query.subCategorias = {
            _id: filtro.idSubCategoria
        }
    }

    return Categoria.find(query)
        .then(categorias => {
            let temFiltro = false;
            let retorno = [];

            for (let i = 0; i < categorias.length; i++) {
                let adicionar = false;

                let novaCategoria = {}
                novaCategoria._id = categorias[i]._id
                novaCategoria.nome = categorias[i].nome
                novaCategoria.situacao = categorias[i].situacao
                novaCategoria.subCategorias = []

                if (categorias[i].subCategorias !== null && categorias[i].subCategorias.length > 0) {
                    for (let a = 0; a < categorias[i].subCategorias.length; a++) {
                        if (filtro.situacao !== undefined && filtro.situacao !== null && filtro.situacao !== '') {
                            temFiltro = true;
                            if (categorias[i].subCategorias[a].situacao.toUpperCase().indexOf(filtro.situacao.toUpperCase()) != -1) {
                                adicionar = true;
                            }
                        }

                        if (filtro.nome !== undefined && filtro.nome !== null && filtro.nome !== '') {
                            temFiltro = true;
                            if (categorias[i].subCategorias[a].nome.toUpperCase().indexOf(filtro.nome.toUpperCase()) != -1) {
                                adicionar = true;
                            } else {
                                if (adicionar) {
                                    adicionar = false;
                                }
                            }
                        }

                        if (adicionar) {
                            novaCategoria.subCategorias.push(categorias[i].subCategorias[a])
                        }
                    }
                }

                if (novaCategoria.subCategorias.length > 0) {
                    retorno.push(novaCategoria);
                }
            }

            return { status: 200, dados: temFiltro ? retorno : categorias }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function buscarPorId(id, idSubCategoria) {
    return Categoria.findById()
        .then(categoria => {
            return { status: 200, dados: categoria.subCategorias.id(idSubCategoria) }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function inserir(idCategoria, subCategoria) {
    return Categoria.findById({ "_id": idCategoria })
        .then(categoria => {
            if (subCategoria.nome !== undefined && subCategoria.nome !== null && subCategoria.nome !== '') {
                let novaSubCategoria = categoria.subCategorias.push({
                    nome: subCategoria.nome
                });

                categoria.save();
                novaSubCategoria -= 1;
                return categoria.subCategorias[novaSubCategoria];
            } else {
                return {}
            }
        })
        .then((subCategoria) => {
            if (!!subCategoria) {
                return { status: 200, dados: subCategoria }
            }

            return { status: 404, dados: "Bad request" }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function alterar(id, categoria) {
    /*
    if(categoria.nome === undefined || categoria.nome === null || categoria.nome === ''){
        delete categoria.nome
    }

    if(categoria.situacao === undefined || categoria.situacao === null || categoria.situacao === ''){
        delete categoria.situacao
    }

    return Categoria.findByIdAndUpdate({ _id: id }, categoria)
        .then(categoria => {
            return {status: 200, dados: categoria}
        })
        .catch(err => {
            return {status: 500, dados: err}
        })
    */
    return { status: 404, dados: "Bad request" }
}

function deletar(idCategoria, idSubCategoria) {
    return Categoria.findById({ "_id": idCategoria })
        .then(categoria => {
            if (idSubCategoria !== undefined && idSubCategoria !== null && idSubCategoria !== '') {
                categoria.subCategorias.id(idSubCategoria).remove();
                categoria.save();
                return { status: 200, dados: "Registro deletado com sucesso." }
            } else {
                return { status: 404, dados: "Bad request" };
            }
        })
        .then((resultado) => {
            return resultado
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

module.exports = exports = { inserir, alterar, deletar, buscarPorId, buscar }
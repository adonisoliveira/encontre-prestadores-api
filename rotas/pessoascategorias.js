module.exports = (servidor) => {
    const repositorioPessoaSubCategoria = require('../repositorio/pessoasubcategoria')

    servidor.post('/pessoas/:id_pessoa/categorias', async (req, res) => {
        const subcategoria = req.body || {}
        const resultado = await repositorioPessoaSubCategoria.inserir(req.params.id_pessoa, subcategoria)

        res.send(resultado.status, resultado.dados)
    })

    servidor.del('/pessoas/:id_pessoa/categorias/:id', async (req, res) => {
        const resultado = await repositorioPessoaSubCategoria.deletar(req.params.id_pessoa, req.params.id)

        res.send(resultado.status, resultado.dados)
    })
}

////////////////////////////////////////////////////////////
/*
module.exports = (servidor, Pessoa) => {
    servidor.get('/pessoas/:id_pessoa/categorias/', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            return pessoa.categorias;
        })
        .then((categorias) => {
            resp.json( categorias );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.get('/pessoas/:id_pessoa/categorias/:id', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            return pessoa.categorias.id(req.params.id);
        })
        .then((categorias) => {
            resp.json( categorias );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.post('/pessoas/:id_pessoa/categorias', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            let c = req.body;
            let novaCategoria = pessoa.categorias.push({
                _id: (c._id != null && c._id != undefined) ? c._id : "",
                nome: (c.nome != null && c.nome != undefined && c.nome != "") ? c.nome.toUpperCase() : ""
            });

            pessoa.save();
            novaCategoria -= 1;
            return pessoa.categorias[novaCategoria];
        })
        .then((categoria) => {
            resp.json( categoria );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        })
    });

    servidor.del('/pessoas/:id_pessoa/categorias/:id', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            pessoa.categorias.id(req.params.id).remove();
            pessoa.save();
            return {};
        })
        .then((pessoa) => {
            resp.json( pessoa );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        })
    })
}
*/
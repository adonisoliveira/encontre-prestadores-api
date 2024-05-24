module.exports = (servidor) => {
    const repositorioPessoaContato = require('../repositorio/pessoacontato')

    servidor.post('/pessoas/:id_pessoa/contatos', async (req, res) => {
        const contato = req.body || {}
        const resultado = await repositorioPessoaContato.inserir(req.params.id_pessoa, contato)

        res.send(resultado.status, resultado.dados)
    })

    servidor.del('/pessoas/:id_pessoa/contatos/:id', async (req, res) => {
        const resultado = await repositorioPessoaContato.deletar(req.params.id_pessoa, req.params.id)

        res.send(resultado.status, resultado.dados)
    })
}

/*
module.exports = (servidor, Pessoa) => {
    servidor.get('/pessoas/:id_pessoa/contatos/', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            return pessoa.contatos;
        })
        .then((contatos) => {
            resp.json( contatos );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.get('/pessoas/:id_pessoa/contatos/:id', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            return pessoa.contatos.id(req.params.id);
        })
        .then((contato) => {
            resp.json( contato );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.post('/pessoas/:id_pessoa/contatos', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            let c = req.body;

            if(c.nome != null && c.nome != undefined && c.nome != "" &&
                c.telefone != null && c.telefone != undefined && c.telefone != "" ){
                let novoContato = pessoa.contatos.push({
                    nome: (c.nome != null && c.nome != undefined) ? c.nome : "",
                    telefone: (c.telefone != null && c.telefone != undefined) ? c.telefone : "",
                    whatsapp:  (c.whatsapp != null && c.whatsapp != undefined) ? c.whatsapp : false
                });

                pessoa.save();
                novoContato -= 1;
                return pessoa.contatos[novoContato];
            }else{
                resp.status(400);
                resp.json({msg: "Bad request!"});
            }
        })
        .then((contato) => {
            resp.json( contato );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.put('/pessoas/:id_pessoa/contatos/:id', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            let contato = req.body;

            if(pessoa.contatos != undefined && pessoa.contatos != null && pessoa.contatos != []){
                for(let i = 0; i <= pessoa.contatos.length; i++){
                    if(pessoa.contatos[i]['_id'] == req.params.id){
                        if(contato.nome != undefined && contato.nome != null && contato.nome != ""){
                            pessoa.contatos[i].nome = contato.nome;
                        }
                        if(contato.telefone != undefined && contato.telefone != null && contato.telefone != ""){
                            pessoa.contatos[i].telefone = contato.telefone;
                        }
                        if(contato.whatsapp != undefined && contato.whatsapp != null){
                            pessoa.contatos[i].whatsapp = contato.whatsapp;
                        }

                        pessoa.save();
                        return pessoa.contatos[i];
                    }
                }
            }
            return {};
        })
        .then((contato) => {
            resp.json(contato);
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.del('/pessoas/:id_pessoa/contatos/:id', (req, resp, next) => {
        Pessoa.findById({"_id" : req.params.id_pessoa})
        .then(pessoa => {
            pessoa.contatos.id(req.params.id).remove();
            pessoa.save();
            return {};
        })
        .then((pessoa) => {
            resp.json( pessoa );
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });
}
*/
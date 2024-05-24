module.exports = (servidor, Pessoa) => {
    servidor.get('/pessoas/:id_pessoa/enderecos/', (req, resp, next) => {
        Pessoa.findById({ "_id": req.params.id_pessoa })
            .then(pessoa => pessoa.enderecos)
            .then(enderecos => resp.json(enderecos))
            .catch(error => {
                resp.status(400);
                resp.json({ msg: error.message });
            });
    });

    servidor.get('/pessoas/:id_pessoa/enderecos/:id', (req, resp, next) => {
        Pessoa.findById({ "_id": req.params.id_pessoa })
            .then(pessoa => {
                return pessoa.enderecos.id(req.params.id);
            })
            .then((endereco) => {
                resp.json(endereco);
            })
            .catch(error => {
                resp.status(400);
                resp.json({ msg: error.message });
            });
    });

    servidor.post('/pessoas/:id_pessoa/enderecos', (req, resp, next) => {
        Pessoa.findById({ "_id": req.params.id_pessoa })
            .then(pessoa => {
                let e = req.body;
                let novoEndereco = pessoa.enderecos.push({
                    nome: (e.nome != null && e.nome != undefined) ? e.nome.toUpperCase() : "",
                    logradouro: (e.logradouro != null && e.logradouro != undefined) ? e.logradouro.toUpperCase() : "",
                    numero: (e.numero != null && e.numero != undefined) ? e.numero.toUpperCase() : "",
                    bairro: (e.bairro != null && e.bairro != undefined) ? e.bairro.toUpperCase() : "",
                    complemento: (e.complemento != null && e.complemento != undefined) ? e.complemento.toUpperCase() : "",
                    cep: (e.cep != null && e.cep != undefined) ? e.cep : "",
                    ibge: (e.ibge != null && e.ibge != undefined && e.ibge > 0) ? e.ibge : 0,
                    cidade: (e.cidade != null && e.cidade != undefined) ? e.cidade.toUpperCase() : "",
                    uf: (e.uf != null && e.uf != undefined) ? e.uf.toUpperCase() : ""
                });

                pessoa.save();
                novoEndereco -= 1;
                return pessoa.enderecos[novoEndereco];
            })
            .then((endereco) => {
                resp.json(endereco);
            })
            .catch(error => {
                resp.status(400);
                resp.json({ msg: error.message });
            });
    });

    servidor.put('/pessoas/:id_pessoa/enderecos/:id', (req, resp, next) => {
        Pessoa.findById({ "_id": req.params.id_pessoa })
            .then(pessoa => {
                let endereco = req.body;

                if (pessoa.enderecos != [] && pessoa.enderecos != {}) {
                    for (let i = 0; i <= pessoa.enderecos.length; i++) {
                        if (pessoa.enderecos[i]['_id'] == req.params.id) {
                            if (endereco.nome != undefined && endereco.nome != null && endereco.nome != "") {
                                pessoa.enderecos[i].nome = endereco.nome.toUpperCase();
                            }
                            if (endereco.logradouro != undefined && endereco.logradouro != null && endereco.logradouro != "") {
                                pessoa.enderecos[i].logradouro = endereco.logradouro.toUpperCase();
                            }
                            if (endereco.numero != undefined && endereco.numero != null && endereco.numero != "") {
                                pessoa.enderecos[i].numero = endereco.numero.toUpperCase();
                            }
                            if (endereco.bairro != undefined && endereco.bairro != null && endereco.bairro != "") {
                                pessoa.enderecos[i].bairro = endereco.bairro.toUpperCase();
                            }
                            if (endereco.cep != undefined && endereco.cep != null && endereco.cep != "") {
                                pessoa.enderecos[i].cep = endereco.cep;
                            }
                            if (endereco.complemento != undefined && endereco.complemento != null && endereco.complemento != "") {
                                pessoa.enderecos[i].complemento = endereco.complemento.toUpperCase();
                            }
                            if (endereco.ibge != undefined && endereco.ibge != null && endereco.ibge > 0) {
                                pessoa.enderecos[i].ibge = endereco.ibge;
                            }
                            if (endereco.cidade != undefined && endereco.cidade != null && endereco.cidade != "") {
                                pessoa.enderecos[i].cidade = endereco.cidade.toUpperCase();
                            }
                            if (endereco.uf != undefined && endereco.uf != null && endereco.uf != "") {
                                pessoa.enderecos[i].uf = endereco.uf.toUpperCase();
                            }

                            pessoa.save();
                            return pessoa.enderecos[i];
                        }
                    }
                }
                return {};
            })
            .then((endereco) => {
                resp.json(endereco);
            })
            .catch(error => {
                resp.status(400);
                resp.json({ msg: error.message });
            });
    });

    servidor.del('/pessoas/:id_pessoa/enderecos/:id', (req, resp, next) => {
        Pessoa.findById({ "_id": req.params.id_pessoa })
            .then(pessoa => {
                pessoa.enderecos.id(req.params.id).remove();
                pessoa.save();
                return {};
            })
            .then((pessoa) => {
                resp.json(pessoa);
            })
            .catch(error => {
                resp.status(400);
                resp.json({ msg: error.message });
            });
    });
}
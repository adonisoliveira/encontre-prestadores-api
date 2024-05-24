module.exports = (servidor, Servico) => {
    servidor.get('/servicos/:id/avaliacoes', (req, resp, next) => {
        Servico.findById({"_id" : req.params.id})
        .then(servico => {            
            return servico.avaliacoes;
        }) 
        .then(avaliacoes => {
            resp.json( avaliacoes );
        }) 
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });    
    });

    servidor.post('/servicos/:id/avaliacoes', (req, resp, next) => { 
        Servico.findById({"_id" : req.params.id})
        .then(servico => { 
            let avaliacao = req.body;

            if(avaliacao.nota != null && avaliacao.nota != undefined && avaliacao.nota > 0 &&
                avaliacao.descricao != null && avaliacao.descricao != undefined && avaliacao.descricao != ""){
                let novaAvaliacao = servico.avaliacoes.push({
                    nota: (avaliacao.nota != null && avaliacao.nota != undefined && avaliacao.nota > 0) ? avaliacao.nota : 0,
                    descricao: (avaliacao.descricao != null && avaliacao.descricao != undefined) ? avaliacao.descricao : ""
                });
                
                servico.save();
                novaAvaliacao -= 1;

                return servico.avaliacoes[novaAvaliacao];
            }else{
                resp.status(400);
                resp.json({msg: "Bad request!"});
            }
        }) 
        .then((avaliacao) => {
            resp.json( avaliacao );
        }) 
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.put('/servicos/:id_servico/avaliacoes/:id', (req, resp, next) => {        
        Servico.findById({"_id" : req.params.id_servico})
        .then(servico => {
            let avaliacao = req.body;
            
            if(servico.avaliacoes != [] && servico.avaliacoes != {}){
                for(let i = 0; i <= servico.avaliacoes.length; i++){
                    if(servico.avaliacoes[i]['_id'] == req.params.id){
                        if(avaliacao.nota != undefined && avaliacao.nota != null && avaliacao.nota > 0){
                            servico.avaliacoes[i].nota = avaliacao.nota;
                        }
                        if(avaliacao.descricao != undefined && avaliacao.descricao != null && avaliacao.descricao != ""){
                            servico.avaliacoes[i].descricao = avaliacao.descricao;
                        }

                        servico.save();
                        return servico.avaliacoes[i];
                    }
                }
            }            
            return {};
        })
        .then((avaliacao) => {
            resp.json(avaliacao);
        })
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });

    servidor.del('/servicos/:id_servico/avaliacoes/:id', (req, resp, next) => {        
        Servico.findById({"_id" : req.params.id_servico})
        .then(servico => {
            servico.avaliacoes.id(req.params.id).remove();
            servico.save();
            return {};
        }) 
        .then((servico) => {
            resp.json( servico );
        }) 
        .catch(error => {
            resp.status(400);
            resp.json({msg: error.message});
        });
    });
}

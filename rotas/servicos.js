module.exports = (servidor) => {
    const repositorioServico = require('../repositorio/servico')

    servidor.get('/servicos', async (req, res) => {
        const filtros = req.query || ''
        const resultado = await repositorioServico.buscar(filtros)

        res.send(resultado)
    })

    servidor.get('/servicos/:id', async (req, res) => {
        const resultado = await repositorioServico.buscarPorId(req.params.id)
        
        res.send(resultado)
    })

    servidor.post('/servicos', async (req, res) => {
        const servico = req.body || {}
        const resultado = await repositorioServico.inserir(servico)

        res.send(resultado)
    })

    servidor.put('/servicos/:id', async (req, res) => {
        const servico = req.body || {}
        const resultado = await repositorioServico.alterar(req.params.id, servico)

        if(!!resultado.sucesso)
        {
            if(!!servico.idContratado)
            {
                const repositorioPessoa = require('../repositorio/pessoa')
                const pessoa = await repositorioPessoa.buscarPorId(servico.idContratado)
                
                if(pessoa.dados !== undefined && !!pessoa.dados.tokenNotificacao)
                {
                    const noticacao = require('../repositorio/notificacao')
                    noticacao.notificarPrestador(pessoa.dados.tokenNotificacao, "Você foi escolhido para o trabalho", "O cliente te escolheu para realizar o trabalho.")
                }
            }
        }

        res.send(resultado)
    })

    servidor.del('/servicos/:id', async (req, res) => {
        const resultado = await repositorioServico.deletar(req.params.id)
        
        res.send(resultado)
    })
}
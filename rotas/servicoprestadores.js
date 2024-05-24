module.exports = (servidor) => {
    const repositorioServicoPrestadores = require('../repositorio/servicoprestadores')

    servidor.post('/servicos/:idservico/prestadores', async (req, res) => {
        const prestador = req.body || {}
        const resultado = await repositorioServicoPrestadores.inserir(req.params.idservico, prestador)

        //notificar contratante caso tenha cadastrado com sucesso
        if(!!resultado.sucesso)
        {
            const repositorioPessoa = require('../repositorio/pessoa')
            //Alerta o contratante que o prestador se candidatou
            const pessoa = await repositorioPessoa.buscarPorId(resultado.dados.idContratante)

            if (!!pessoa.sucesso && !!pessoa.dados.tokenNotificacao)
            {
                const noticacao = require('../repositorio/notificacao')
                noticacao.notificarContratante(pessoa.dados.tokenNotificacao, "Um prestador se candidatando ao trabalho", "Um novo prestador tem interesse em seu serviço.")
            }
        }

        res.send(resultado)
    })

    servidor.del('/servicos/:idservico/prestadores/:idprestador', async (req, res) => {
        const resultado = await repositorioServicoPrestadores.deletar(req.params.idservico, req.params.idprestador)
        
        res.send({ sucesso: resultado.sucesso })
    })
}

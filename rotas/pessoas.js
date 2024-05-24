module.exports = (servidor) => {
    const repositorioPessoa = require('../repositorio/pessoa')

    servidor.get('/pessoas', async (req, res) => {
        const filtros = req.query || ''

        if (filtros.usuario !== undefined && filtros.usuario !== null && filtros.usuario !== "") { //Busca se o usuário existe
            const resultado = await repositorioPessoa.buscarPorUsuario(filtros.usuario)
            res.send({ existeUsuario: resultado.sucesso })
        } 
        else 
            res.send(await repositorioPessoa.buscar(filtros))
    })

    servidor.get('/pessoas/:id', async (req, res) => {
        res.send(await repositorioPessoa.buscarPorId(req.params.id))
    })

    servidor.post('/pessoas', async (req, res) => {
        const pessoa = req.body || {}
        const resultado = await repositorioPessoa.inserir(pessoa)

        res.send({ sucesso: resultado.sucesso })
    })

    servidor.put('/pessoas/:id', async (req, res) => {
        const pessoa = req.body || {}
        const resultado = await repositorioPessoa.alterar(req.params.id, pessoa)

        res.send({ sucesso: resultado.sucesso })
    })

    servidor.post('/pessoas/:id/token', async (req, res) => {
        const token = req.body || {}
        
        if (!!token.token) 
        {
            const resultado = await repositorioPessoa.alterarToken(req.params.id, token.token)
           
            res.send(resultado.status, resultado.dados)
        }
    })

    servidor.del('/pessoas/:id', async (req, res) => {
        const resultado = await repositorioPessoa.deletar(req.params.id)

        res.send(resultado.status, resultado.dados)
    })
}
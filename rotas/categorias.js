module.exports = (servidor) => {
    const repositorioCategoria = require('../repositorio/categoria')

    servidor.get('/categorias', async (req, res) => {
        const filtros = req.query || ''
        const resultado = await repositorioCategoria.buscar(filtros)

        res.send(resultado.dados)
    })

    servidor.get('/categorias/:id', async (req, res) => {
        const resultado = await repositorioCategoria.buscarPorId(req.params.id)
        res.send(resultado.dados)
    })

    servidor.post('/categorias', async (req, res) => {
        const categoria = req.body || {}
        if(categoria !== undefined && categoria !== null)
            res.send(await repositorioCategoria.inserir(categoria))
        else
            res.send(400, { sucesso: false, mensagem: "Bad request." })
    })

    servidor.put('/categorias/:id', async (req, res) => {
        const categoria = req.body || {}
        const resultado = await repositorioCategoria.alterar(req.params.id, categoria)

        res.send(resultado.status, resultado.dados)
    })

    servidor.del('/categorias/:id', async (req, res) => {
        if(!!req.params?.id)
            res.send(await repositorioCategoria.deletar(req.params.id))
        else
            res.send(400, { sucesso: false, mensagem: "Bad request." })
    })
}
module.exports = (servidor) => {
    const repositorioSubCategoria = require('../repositorio/subcategoria')

    servidor.get('/subcategorias/:idsubcategoria', async (req, res) => {
        const resultado = await repositorioSubCategoria.buscarPorId('', req.params.idsubcategoria)

        res.send(resultado.status, resultado.dados)
    })

    servidor.get('/subcategorias', async (req, res) => {
        const filtros = req.query || ''
        const resultado = await repositorioSubCategoria.buscar('', filtros, filtros.limit, filtros.skip)

        res.send(resultado.status, resultado.dados)
    })

    servidor.get('/categorias/:idcategoria/subcategorias', async (req, res) => {
        const filtros = req.query || ''
        const resultado = await repositorioSubCategoria.buscar(req.params.idcategoria, filtros, filtros.limit, filtros.skip)

        res.send(resultado.status, resultado.dados)
    })

    servidor.get('/categorias/:idcategoria/subcategorias/:idsubcategoria', async (req, res) => {
        const resultado = await repositorioSubCategoria.buscarPorId(req.params.idcategoria, req.params.idsubcategoria)

        res.send(resultado.status, resultado.dados)
    })

    servidor.post('/categorias/:idcategoria/subcategorias', async (req, res) => {
        const subCategoria = req.body || {}
        const resultado = await repositorioSubCategoria.inserir(req.params.idcategoria, subCategoria)

        res.send(resultado.status, resultado.dados)
    })

    servidor.put('/categorias/:id/subcategorias/:idsubcategoria', async (req, res) => {
        const subCategoria = req.body || {}
        const resultado = await repositorioSubCategoria.alterar(req.params.idcategoria, req.params.idsubcategoria, subCategoria)

        res.send(resultado.status, resultado.dados)
    })

    servidor.del('/categorias/:idcategoria/subcategorias/:idsubcategoria', async (req, res) => {
        const resultado = await repositorioSubCategoria.deletar(req.params.idcategoria, req.params.idsubcategoria)

        res.send(resultado.status, resultado.dados)
    })
}
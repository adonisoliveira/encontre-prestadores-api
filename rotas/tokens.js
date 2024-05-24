module.exports = (servidor) => {
    const repositorioToken = require('../repositorio/token')

	servidor.get('/tokens', async (req, res) => {
        const filtros = req.query || ''
        const resultado = await repositorioToken.buscar(filtros, filtros.limit, filtros.skip)
        
        res.send(resultado.status, resultado.dados)
    })
    
    servidor.get('/tokens/:id', async (req, res) => {
        const resultado = await repositorioToken.buscarPorId(req.params.id)
        
        res.send(resultado.status, resultado.dados)
	})

    servidor.post('/tokens', async (req, res) => {
        const token = req.body || {}
        const resultado = await repositorioToken.inserir(token)
        
        res.send(resultado.status, resultado.dados)
    })

    servidor.put('/tokens/:id', async (req, res) => {
        const token = req.body || {}
        const resultado = await repositorioToken.alterar(req.params.id, token)
        
        res.send(resultado.status, resultado.dados)
	})
    
    servidor.del('/tokens/:id', async (req, res) => {
        const resultado = await repositorioToken.deletar(req.params.id)
        
        res.send(resultado.status, resultado.dados)
	})
}
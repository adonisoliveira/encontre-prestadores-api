module.exports = (servidor) => {
    const repositorioAvaliacoes = require('../repositorio/pessoaavaliacao')

    servidor.get('/pessoas/:id/avaliacoes/nota', async (req, res) => {
        res.send(await repositorioAvaliacoes.buscarNota(req.params.id))
    })

    servidor.get('/pessoas/:id/avaliacoes', async (req, res) => {
        res.send(await repositorioAvaliacoes.buscar(req.params.id))
    })

    servidor.post('/pessoas/:id/avaliacoes', async (req, res) => {
        const avaliacao = req.body || {}
        res.send(await repositorioAvaliacoes.inserir(req.params.id, avaliacao))
    })
}

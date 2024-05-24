module.exports = (servidor) => {
    const repositorioVersoes = require('../repositorio/versao')

    servidor.get('/versoes', async (req, res) => {
        res.send(await repositorioVersoes.buscar())
    })

    servidor.post('/versoes', async (req, res) => {
        res.send(await repositorioVersoes.inserir())
    })
}
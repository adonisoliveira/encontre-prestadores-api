module.exports = (servidor) => {
    const repositorioProblemas = require('../repositorio/problema')

    servidor.post('/problemas', async (req, res) => {
        const problema = req.body || {}
        
        res.send(await repositorioProblemas.inserir(problema))
    })
}
const restify = require('restify')
const mongoose = require('mongoose')
const configuracao = require('./config/index')
const corsMiddleware = require('restify-cors-middleware')
//const fs = require('fs')

// //Configura o ssl local
// const sslOptions = {
//     certificate: fs.readFileSync(`C:/Users/adoni/Desenvolvimento/certificados/back.pfx`),
//     passphrase: 'adonis'
// }

mongoose.connect(configuracao.db.uri, configuracao.db.parametros).then(_=> {
    const servidor = restify.createServer({
        name: configuracao.nome,
        version: configuracao.versao,
        ignoreTrailingSlash: true,
        // http2: {
		// 	cert: fs.readFileSync("./config/keys/certificate.pem"),
		// 	key: fs.readFileSync("./config/keys/key.pem"),
		// 	allowHTTP1: true
		// }
        //Configura o ssl local
        // httpsServerOptions: { 
        //     pfx: sslOptions.certificate,
        //     passphrase: sslOptions.passphrase,
        // }
    })

    servidor.use(restify.plugins.bodyParser())
    servidor.use(restify.plugins.queryParser())
    servidor.use(restify.plugins.fullResponse())

    const cors = corsMiddleware({
        origins: ['*']
    })
    servidor.pre(cors.preflight)
    servidor.use(cors.actual)

    //Realiza o redirecionamento para HTTPS caso o acesso tenha sido por HTTP
    // const redirectHttps = (req, res, next) => {
    //     if (req.headers["x-forwarded-proto"] != "https") {
    //         res.redirect(301, `https://${req.headers.host}${req.url}`, next);
    //     } else {
    //         next()
    //     }
    // }
    // if (configuracao.environment == 'development') {
    //     servidor.use(redirectHttps)
    // }

    //ROTAS
    ////////////////////////////////////////////////////////////
    require('./rotas/autenticacao')(servidor)
    require('./rotas/categorias')(servidor)
    require('./rotas/subcategoria')(servidor)
    require('./rotas/tokens')(servidor)
    require('./rotas/servicos')(servidor)
    require('./rotas/servicoprestadores')(servidor)
    require('./rotas/pessoas')(servidor)
    require('./rotas/pessoascategorias')(servidor)
    require('./rotas/pessoascontatos')(servidor)
    require('./rotas/pessoasavaliacoes')(servidor)
    require('./rotas/problemas')(servidor)
    require('./rotas/versoes')(servidor)

    servidor.listen(configuracao.porta, _=> {
        console.log(`Servidor rodando na porta ${configuracao.porta}`)
    })
})
.catch(erro => {
    console.log(`Erro ao conectar com MongoDB: ${erro.message}`)
})

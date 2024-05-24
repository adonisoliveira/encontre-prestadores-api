module.exports = (servidor) => {
    const repositorioPessoa = require('../repositorio/pessoa')
    const repositorioToken = require('../repositorio/token')

    //Login por usuário e senha
    servidor.post('/autenticacao', async (req, res) => {
        const body = req.body
        if(body.semCadastro)
        {
            //Cria um novo token
            const novoToken = await repositorioToken.inserir("", true)
            if(novoToken.sucesso)
            {
                //Adiciona o header
                res.header('Authorization', novoToken.dados._id)
                res.send({
                    autenticado: true,
                    token: novoToken.dados._id
                })
            } 
            else
            {
                res.send({
                    autenticado: false,
                    mensagem: "Não foi possível gerar um token."
                })
            }
        } 
        else
        {
            const pessoa = await repositorioPessoa.login(body.usuario, body.senha)
            if(pessoa.sucesso)
            {
                //Busca o token da pessoa e deleta
                const logado = await repositorioToken.buscarPorPessoa(pessoa.dados._id)
                if(logado.sucesso)
                {
                    if(!!logado.dados?._id)
                        await repositorioToken.deletar(logado.dados._id)
                }

                //Cria um novo token
                const novoToken = await repositorioToken.inserir(pessoa.dados._id, false)
                if(novoToken.sucesso)
                {
                    //Adiciona o header
                    res.header('Authorization', novoToken.dados._id)
                    res.send({
                        autenticado: true,
                        token: novoToken.dados._id,
                        usuario: {
                            _id: pessoa.dados._id,
                            nome: pessoa.dados.nome,
                            prestador: pessoa.dados.prestador,
                            ibge: pessoa.dados.endereco.ibge,
                            uf: pessoa.dados.endereco.uf,
                            categorias: pessoa.dados.categorias
                        }
                    })
                }
                else
                {
                    res.send({
                        autenticado: false,
                        mensagem: "Não foi possível gerar um token."
                    })
                }
            } 
            else
            {
                res.send({
                    autenticado: false,
                    mensagem: pessoa.dados
                })
            }
        }
    })

    servidor.get('/autenticacao/:id', async (req, res) => {
        if(!!req.params?.id) 
        {
            let retorno = { 
                autenticado: false 
            }

            const token = await repositorioToken.buscarPorId(req.params.id)
            if(token.sucesso)
            {
                if(!!token.dados?.idPessoa)
                {
                    const pessoa = await repositorioPessoa.buscarPorId(token.dados.idPessoa)
                    if(pessoa.sucesso)
                    {
                        //Adiciona o header
                        res.header('Authorization', token.dados._id);
                        res.send({
                            autenticado: true,
                            pessoa: {
                                _id: pessoa.dados._id,
                                nome: pessoa.dados.nome,
                                prestador: pessoa.dados.prestador,
                                ibge: pessoa.dados.endereco.ibge,
                                uf: pessoa.dados.endereco.uf,
                                categorias: pessoa.dados.categorias
                            }
                        })
                    } 
                    else
                        res.send(retorno)
                } 
                else
                    res.send(retorno)
            }
            else
                res.send(retorno)
        } 
        else
            res.send(400, { mensagem: "Nenhum token informado." })
    })

    servidor.del('/autenticacao/:id', async (req, res) => {
        if(!!req.params?.id)
        {
            if(!!req.header('Authorization'))
            {
                if(req.header('Authorization') === req.params.id)
                {
                    const retorno = await repositorioToken.deletar(req.params.id)
                    if(retorno.sucesso)
                        res.send({ sucesso: true })
                    else
                        res.send({ sucesso: false, mensagem: retorno.dados })
                } 
                else
                    res.send(401, { sucesso: false, mensagem: "Não autorizado." })
            } 
            else
                res.send(400, { sucesso: false, mensagem: "Bad request." })
        } 
        else
            res.send(400, { sucesso: false, mensagem: "Bad request." })
    })
}

const Pessoa = require('../modelos/pessoa')

function login(usuario, senha)
{
    let query = {}
    query.usuario = '-'
    query.senha = '-'

    //Valida os parâmetros
    if (usuario !== undefined && usuario !== null && usuario !== '')
    {
        query.usuario = { $regex: usuario, $options: 'i' }

        if (senha !== undefined && senha !== null && senha !== '')
            query.senha = { $regex: senha, $options: 'i' }
        else
            return { sucesso: false, dados: "Informe a senha." }
    } 
    else
        return { sucesso: false, dados: "Informe o usuário." }

    //Realiza a pesquisa
    return Pessoa.find(
        query,
        {
            _id: 1,
            nome: 1,
            prestador: 1,
            "endereco.ibge": 1,
            "endereco.uf": 1,
            categorias: 1
        })
        .then(pessoas => {
            if (pessoas.length > 0)
            {
                if (pessoas.length == 1)
                    return { sucesso: true, dados: pessoas[0] }
            }

            return { sucesso: false, dados: "Usuário não encontrado." }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })
}

function buscarPorUsuario(usuario)
{
    let query = {}
    query.usuario = '-'

    //Valida os parâmetros
    if (usuario !== undefined && usuario !== null && usuario !== '')
        query.usuario = { $regex: usuario, $options: 'i' }
    else
        return { sucesso: false, dados: "Informe o usuário." }

    //Realiza a pesquisa
    return Pessoa.find(
        query,
        {
            _id: 1
        })
        .then(pessoas => {
            if (pessoas.length > 0)
                return { sucesso: true, dados: pessoas[0] }

            return { sucesso: false, dados: "Usuário não encontrado." }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })
}

function buscar(filtro)
{
    let query = {}

    if (filtro.nome !== undefined && filtro.nome !== null && filtro.nome !== '')
        query.nome = { $regex: filtro.nome, $options: 'i' }

    if (filtro.situacao !== undefined && filtro.situacao !== null && filtro.situacao !== '')
        query.situacao = { $regex: filtro.situacao, $options: 'i' }

    if (filtro.id !== undefined && filtro.id !== null && filtro.id !== '')
        query._id = filtro.id

    if (filtro.usuario !== undefined && filtro.usuario !== null && filtro.usuario !== '')
        query.usuario = filtro.usuario

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //SELECIONA OS CAMPOS QUE RETORNARAM NA PESQUISA
    let camposRetornados = {}

    if (filtro.tipoRetorno == 1)
    { //retorna somente nome
        camposRetornados.nome = 1
        camposRetornados.descricao = 1
    } 
    else
        camposRetornados.senha = 0

    return Pessoa.find(query, camposRetornados)
        .then(pessoas => {
            return { sucesso: true, dados: pessoas }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })
}

function buscarPorId(id)
{
    if (id !== undefined && id !== null && id !== '')
    {
        return Pessoa.findById(id, { senha: 0 })
            .then(pessoa => {
                if (pessoa !== null)
                    return { sucesso: true, dados: pessoa }
                else
                    return { sucesso: false, dados: "Pessoa não encontrada." }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhuma pessoa informada." }
}

function inserir(pessoa) 
{
    return Pessoa.create(pessoa)
        .then(ok => {
            return { sucesso: true, dados: ok }
        })
        .catch(err => {
            return { sucesso: false, dados: err }
        })
}

function alterar(id, pessoa)
{
    if (id !== undefined && id !== null && id !== '') {
        if (pessoa.nome === undefined || pessoa.nome === null || pessoa.nome === '')
            delete pessoa.nome

        if (pessoa.descricao === undefined || pessoa.descricao === null || pessoa.descricao === '')
            delete pessoa.descricao

        if (pessoa.situacao === undefined || pessoa.situacao === null || pessoa.situacao === '')
            delete pessoa.situacao

        if (pessoa.senha === undefined || pessoa.senha === null || pessoa.senha === '')
            delete pessoa.senha

        if (pessoa.email === undefined || pessoa.email === null || pessoa.email === '')
            delete pessoa.email

        if (pessoa.prestador === undefined || pessoa.prestador === null || pessoa.prestador === '')
            delete pessoa.prestador

        if (pessoa.tokenNotificacao === undefined || pessoa.tokenNotificacao === null || pessoa.tokenNotificacao === '')
            delete pessoa.tokenNotificacao

        if (pessoa.endereco === undefined || pessoa.endereco === null || pessoa.endereco === {})
            delete pessoa.endereco
        else 
        {
            if (pessoa.endereco.logradouro === undefined || pessoa.endereco.logradouro === null || pessoa.endereco.logradouro === '')
                delete pessoa.endereco.logradouro

            if (pessoa.endereco.complemento === undefined || pessoa.endereco.complemento === null || pessoa.endereco.complemento === '')
                delete pessoa.endereco.complemento

            if (pessoa.endereco.numero === undefined || pessoa.endereco.numero === null || pessoa.endereco.numero === '')
                delete pessoa.endereco.numero

            if (pessoa.endereco.bairro === undefined || pessoa.endereco.bairro === null || pessoa.endereco.bairro === '')
                delete pessoa.endereco.bairro

            if (pessoa.endereco.cep === undefined || pessoa.endereco.cep === null || pessoa.endereco.cep === '')
                delete pessoa.endereco.cep

            if (pessoa.endereco.ibge === undefined || pessoa.endereco.ibge === null || pessoa.endereco.ibge === 0)
                delete pessoa.endereco.ibge

            if (pessoa.endereco.cidade === undefined || pessoa.endereco.cidade === null || pessoa.endereco.cidade === '')
                delete pessoa.endereco.cidade

            if (pessoa.endereco.uf === undefined || pessoa.endereco.uf === null || pessoa.endereco.uf === '')
                delete pessoa.endereco.uf

            if (pessoa.endereco.latitude === undefined || pessoa.endereco.latitude === null || pessoa.endereco.latitude === '')
                delete pessoa.endereco.latitude

            if (pessoa.endereco.longitude === undefined || pessoa.endereco.longitude === null || pessoa.endereco.longitude === '')
                delete pessoa.endereco.longitude

            if (pessoa.endereco === {})
                delete pessoa.endereco
        }

        return Pessoa.findByIdAndUpdate({ _id: id }, pessoa)
            .then(pessoa => {
                return { sucesso: true, dados: pessoa }
            })
            .catch(err => {
                return { sucesso: false, dados: err }
            })
    } 
    else
        return { sucesso: false, dados: "Nenhuma pessoa informada" }
}

function alterarToken(id, token) {
    return Pessoa.findByIdAndUpdate({ _id: id }, { tokenNotificacao: token })
        .then(_ => {
            return { status: 200, dados: "Token alterado com sucesso." }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

function deletar(id) {
    return Pessoa.findByIdAndRemove(id)
        .then(pessoa => {
            return { status: 200, dados: pessoa ? "Pessoa deletada com sucesso" : "Pessoa não encontrada" }
        })
        .catch(err => {
            return { status: 500, dados: err }
        })
}

module.exports = exports = { 
    login, 
    inserir, 
    alterar, 
    deletar, 
    buscarPorId, 
    buscar, 
    buscarPorUsuario, 
    alterarToken 
}
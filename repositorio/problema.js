const Problema = require('../modelos/problema')

function inserir(problema)
{
    if (problema.tipoDispositivo !== undefined && problema.tipoDispositivo !== null && problema.tipoDispositivo > 0)
    {
        if (problema.tipoRede !== undefined && problema.tipoRede !== null && problema.tipoRede > 0)
        {
            if (problema.sistemaOperacional !== undefined && problema.sistemaOperacional !== null && problema.sistemaOperacional > 0)
            {
                if (problema.descricao !== undefined && problema.descricao !== null && problema.descricao !== '')
                {
                    return Problema.create(problema)
                        .then(novoProblema => {
                            return { sucesso: true, dados: novoProblema }
                        })
                        .catch(err => {
                            return { sucesso: false, dados: err }
                        })
                } 
                else
                    return { sucesso: false, dados: "Descrição do problema não informada." }
            } 
            else
                return { sucesso: false, dados: "Sistema operacional não informado." }
        } 
        else
            return { sucesso: false, dados: "Tipo de rede não informado." }
    } 
    else
        return { sucesso: false, dados: "Tipo de dispositivo não informado." }
}

module.exports = exports = { inserir }
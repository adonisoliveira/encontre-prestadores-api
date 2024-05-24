const axios = require('axios')

function notificarPrestador(tokenPrestador, titulo, texto)
{
    let notificacao = {
        to: tokenPrestador,
        data: {
            notification: {
                title: titulo,
                body: texto
            }
        }
    }

    let headers = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Key=AAAAUk7R9nU:APA91bFYyY6aEErGsRhoticZC99sulII4xhgua5JnGSlYjWltGvepihO_2QU2B7nZOWwovxLYJ9VHfJF3h1PiRPOwTNThD39J6LdO1tlyUFdO5Yu5ke_BQCfsfF_X9uoYrY6yR5UeaTm"
        }
    }

    axios.post("https://fcm.googleapis.com/fcm/send", notificacao, headers)
        .then(function () { })
        .catch(function () { })
}

function notificarPrestadores()
{

}

function notificarContratante(tokenContratante, titulo, texto)
{
    let notificacao = {
        to: tokenContratante,
        data: {
            notification: {
                title: titulo != "" ? titulo : "Novo serviço",
                body: texto != "" ? texto : "Clientes estão procurando seus serviços."
            }
        }
    }

    let headers = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Key=AAAAUk7R9nU:APA91bFYyY6aEErGsRhoticZC99sulII4xhgua5JnGSlYjWltGvepihO_2QU2B7nZOWwovxLYJ9VHfJF3h1PiRPOwTNThD39J6LdO1tlyUFdO5Yu5ke_BQCfsfF_X9uoYrY6yR5UeaTm"
        }
    }

    axios.post("https://fcm.googleapis.com/fcm/send", notificacao, headers)
        .then(function () { })
        .catch(function () { })
}

module.exports = exports = { 
    notificarPrestador, 
    notificarPrestadores, 
    notificarContratante 
}

const database = require('../models')
class Services{
    constructor (nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosRegistros(req, res){
        return database[this.nomeDoModelo].findAll()
    }

    async pegaRegistro(){}
    async criaRegistro(){}

    async atualizaRegistro(dados, id, transacao={}){
        return database[this.nomeDoModelo].update(
            dados,
            {where: { id:id}
            },transacao
        )
    }

    async atualizaRegistros(dados, where, transacao={}){
        return database[this.nomeDoModelo].update(
            dados,
            {where: {... where}
            },transacao
        )
    }


    async deletaRegistro(){}

}

module.exports = Services
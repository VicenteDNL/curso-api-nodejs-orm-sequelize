const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegarRegistrosAtivos(where={}){
        return database[this.nomeDoModelo].findAll({
            where: {
                ...where
            }
        })
    }

    async pegarTodasRegistros(where={}){
        return database[this.nomeDoModelo].scope('todos').findAll({
            where: {
                ...where
            }
        })
    }

    async cancelaPessoaEMatricula(estudanteId){
        return database.sequelize.transaction(async transacao =>{
            await super.atualizaRegistro(
                {ativo:false},
                {id:Number(estudanteId)},
                {transaction:transacao}
            )
            await this.matriculas.atualizaRegistros(
                {status:'cancelado'},
                {estudante_id:estudanteId},
                {transaction:transacao}
            )
        })
    }
}

module.exports = PessoasServices
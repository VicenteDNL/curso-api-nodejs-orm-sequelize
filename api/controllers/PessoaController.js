// const database = require('../models')
// const Sequileze = require('sequelize')

const {PessoasServices} = require('../services')
const pessoaService = new PessoasServices()

class PessoaController{

    static async pegaPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await pessoaService.pegarRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await pessoaService.pegarTodasRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async pegarUmaPessoa(req, res){
        const {id} =req.params
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(umaPessoa)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async criarUmaPessoa(req, res){
        const pessoa = req.body
        try{
            const pessoaCriada = await database.Pessoas.create(pessoa)
            return res.status(200).json(pessoaCriada)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async atualizarUmaPessoa(req, res){
        const {id} =req.params
        const novasInfos = req.body
        try{
            await database.Pessoas.update(novasInfos,{
                where:{id:Number(id)}
            })

            const pessoaAtualizada = await database.Pessoas.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(pessoaAtualizada)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async deletarUmaPessoa(req, res){
        const {id} =req.params
        try{
           await database.Pessoas.destroy({
                where:{id:Number(id)}
            })
            return res.status(200).json({mensagem:`id ${id} deletado`})

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async restauraPessoa (req, res){
        const {id} =req.params
        try{
            await database.Pessoas.restore({
                where:{id:Number(id)}
             })
            return res.status(200).json({mensagem:`id ${id} restaurado`})
 
         }catch(erro){
             return res.status(500).json(erro.message)
         }

    }

    static async pegarUmaMatricula(req, res){
        const {estudanteId, matriculaId} =req.params
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where:{
                    id:Number(matriculaId),
                    estudante_id:Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async criarUmaMatricula(req, res){
        const {estudanteId} =req.params
        const novaMatricula = {...req.body, estudante_id:Number(estudanteId)}

        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async atualizarUmaMatricula(req, res){
        const {estudanteId, matriculaId} =req.params
        const novasInfos = req.body
        try{
            await database.Matriculas.update(novasInfos,{
                where:{
                    id:Number(matriculaId),
                    estudante_id:Number(estudanteId)
                }
            })

            const matriculaAtualizada = await database.Matriculas.findOne({
                where:{
                    id:Number(matriculaId),
                    estudante_id:Number(estudanteId)
                }
            })
            return res.status(200).json(matriculaAtualizada)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async deletarUmaMatricula(req, res){
        const {estudanteId, matriculaId} =req.params
        try{
           await database.Matriculas.destroy({
            where:{
                id:Number(matriculaId),
                estudante_id:Number(estudanteId)
            }
            })
            return res.status(200).json({mensagem:`id ${matriculaId} deletado`})

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async restauraMatricula (req, res){
        const {estudanteId, matriculaId} =req.params
        try{
            await database.Matriculas.restore({
                where:{
                    id:Number(matriculaId),
                    estudante_id:Number(estudanteId)
                }
             })
            return res.status(200).json({mensagem:`id ${matriculaId} restaurado`})
 
         }catch(erro){
             return res.status(500).json(erro.message)
         }

    }

    static async pegaMatriculas(req, res){
        const {estudanteId} =req.params
        try{
            const pessoa = await database.Pessoas.findOne({
                where:{id:Number(estudanteId)}
            })
            const matriculas = await pessoa.getAulasMatriculadas()
            
            return res.status(200).json(matriculas)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res){
        const {turmaId} =req.params
        try{
            const matriculas = await database.Matriculas
                .findAndCountAll({
                        where:{
                            turma_id:Number(turmaId),
                            status:'confirmado'
                        },
                        limit:20,
                        order:[['estudante_id','ASC']]
                })
            
            return res.status(200).json(matriculas)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma =2
        const {turmaId} =req.params
        try{
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                        where:{
                            status:'confirmado'
                        },
                        attributes:['turma_id'],
                        group:['turma_id'],
                        having: Sequileze.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })
            
            return res.status(200).json(turmasLotadas)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    
    static async cancelaPessoa(req, res){
        const {estudanteId} = req.params
        try{ 
            await pessoaService.cancelaPessoaEMatricula(estudanteId)
            return res.status(200).json({mensagem:`matriculas do estudante ${estudanteId} canceladas`})

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }



}

module.exports = PessoaController
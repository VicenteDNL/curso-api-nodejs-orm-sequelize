const database = require('../models')

class NivelController{

    static async pegaTodosOsNiveis(req, res){
        try{
            const todosNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosNiveis)
        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async pegarUmNivel(req, res){
        const {id} =req.params
        try{
            const umNivel = await database.Niveis.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(umNivel)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async criarUmNivel(req, res){
        const nivel = req.body
        try{
            const nivelCriado = await database.Niveis.create(nivel)
            return res.status(200).json(nivelCriado)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async atualizarUmNivel(req, res){
        const {id} =req.params
        const novasInfos = req.body
        try{
            await database.Niveis.update(novasInfos,{
                where:{id:Number(id)}
            })

            const nivelAtualizado = await database.Niveis.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(nivelAtualizado)

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async deletarUmNivel(req, res){
        const {id} =req.params
        try{
           await database.Niveis.destroy({
                where:{id:Number(id)}
            })
            return res.status(200).json({mensagem:`id ${id} deletado`})

        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async restauraNivel (req, res){
        const {id} =req.params
        try{
            await database.Niveis.restore({
                where:{id:Number(id)}
             })
            return res.status(200).json({mensagem:`id ${id} restaurado`})
 
         }catch(erro){
             return res.status(500).json(erro.message)
         }

    }
    



}

module.exports = NivelController
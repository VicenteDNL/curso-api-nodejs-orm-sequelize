const {Router} = require('express')
const NivelController = require('../controllers/NivelController')


const router = Router()

router.get('/niveis',NivelController.pegaTodosOsNiveis)
router.get('/niveis/:id',NivelController.pegarUmNivel)
router.post('/niveis/',NivelController.criarUmNivel)
router.put('/niveis/:id',NivelController.atualizarUmNivel)
router.delete('/niveis/:id',NivelController.deletarUmNivel)
router.post('/niveis/:id/restaura',NivelController.restauraNivel)

module.exports = router


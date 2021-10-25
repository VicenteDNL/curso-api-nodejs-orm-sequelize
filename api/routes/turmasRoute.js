const {Router} = require('express')
const TurmaController = require('../controllers/TurmaController')


const router = Router()

router.get('/turmas',TurmaController.pegaTodasAsTurmas)
router.get('/turmas/:id',TurmaController.pegarUmaTurma)
router.post('/turmas',TurmaController.criarUmaTurma)
router.put('/turmas/:id',TurmaController.atualizarUmaTurma)
router.delete('/turmas/:id',TurmaController.deletarUmaTurma)
router.post('/turmas/:id/restaura',TurmaController.restauraTurma)

module.exports = router


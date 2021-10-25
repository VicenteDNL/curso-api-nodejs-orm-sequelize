const {Router} = require('express')
const PessoaController = require('../controllers/PessoaController')


const router = Router()

router.get('/pessoas',PessoaController.pegaPessoasAtivas)
router.get('/pessoas/todos',PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id',PessoaController.pegarUmaPessoa)
router.post('/pessoas/',PessoaController.criarUmaPessoa)
router.put('/pessoas/:id',PessoaController.atualizarUmaPessoa)
router.delete('/pessoas/:id',PessoaController.deletarUmaPessoa)
router.post('/pessoas/:id/restaura',PessoaController.restauraPessoa)
router.get('/pessoas/:estudanteId/matricula',PessoaController.pegaMatriculas)
router.get('/pessoas/:estudanteId/matricula/:matriculaId',PessoaController.pegarUmaMatricula)
router.post('/pessoas/:estudanteId/matricula',PessoaController.criarUmaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId',PessoaController.atualizarUmaMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId',PessoaController.deletarUmaMatricula)
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura',PessoaController.restauraMatricula)
router.get('/pessoas/matricula/:turmaId/confirmadas',PessoaController.pegaMatriculasPorTurma)
router.get('/pessoas/matricula/lotadas',PessoaController.pegaTurmasLotadas)
router.post('/pessoas/:estudanteId/cancela',PessoaController.cancelaPessoa)

module.exports = router


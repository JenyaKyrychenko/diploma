const {Router} = require('express')
const ExamResults =  require('./../models/ExamResults')
const Exam = require('./../models/Exam')
const Speciality = require('./../models/Speciality')
const router = Router()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET all ExamResults
router.get('/', async (req, res) => {
    try {
        const userId = req.params.userId
        const examResults = await ExamResults.findAll({include:[Exam,Speciality]})
        res.json(examResults)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// GET examResults for user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const examResults = await ExamResults.findAll({where:{userId},include:[Exam,Speciality]})
        res.json(examResults)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// CREATE exam result for user
router.post('/:userId/add', async (req, res) => {
    try {
        const userId = req.params.userId
        const examId = req.body.examId
        const examMark = req.body.examMark
        const specialityId = req.body.specialityId
        const exist = await ExamResults.findOne({where:{examId,userId}})
        if(exist){
            return res.json({message:'Ви вже маєте результат цього екзамену!'})
        }
        await ExamResults.create({userId, examId, examMark, specialityId})
        res.json({message:'Результат додано!'})

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})


module.exports = router

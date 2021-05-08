const {Router} = require('express')
const Exam = require('./../models/Exam')
const Speciality = require('../models/Speciality')
const router = Router()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET all exams
router.get('/', async (req, res) => {
    try {
        const exams = await Exam.findAll()
        res.json(exams)

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// GET exams for speciality
router.get('/:specialityId', async (req, res) => {
    try {
        const specialityId = req.params.specialityId
        const speciality = await Speciality.findOne({where: {id: specialityId}, include: Exam})
        if (speciality.exams.toString() === '') {
            res.json('')
        } else {
            res.json({speciality, exams: speciality.exams})
        }

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// Create exam
router.post('/create', async (req, res) => {
    try {
        const subjectExam = req.body.subject
        const specialityId = req.body.specialityId
        const examDate = req.body.examDate
        const examAddress = req.body.examAddress
        await Exam.create({subjectExam, specialityId, examAddress, examDate})
        res.json({message: 'Екзамен доданий!'})

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// DELETE exam by ID
router.delete('/:id/delete', async (req, res) => {
    try {
        const id = req.params.id
        await Exam.destroy({where:{id}})
        res.json({message: 'Екзамен видалений!'})

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})


module.exports = router

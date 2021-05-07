const {Router} = require('express')
const Exam = require('./../models/Exam')
const Speciality = require('../models/Speciality')
const router = Router()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET exams for speciality
router.get('/:specialityId',urlencodedParser, async (req, res) => {
    try {
        const specialityId = req.params.specialityId
        const speciality = await Speciality.findOne({where:{id:specialityId}, include:Exam})
        if(speciality.exams.toString() === ''){
            res.json('')
        } else {
            res.json({speciality, exams:speciality.exams})
        }

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})




module.exports = router

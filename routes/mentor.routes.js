const {Router} = require('express')
const Mentor = require('./../models/Mentor')
const User = require('./../models/User')
const Speciality = require('./../models/Speciality')
const router = Router()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET mentor by email
router.post('/email/',urlencodedParser, async (req, res) => {
    try {
        const email= req.body.email
        const mentor = await Mentor.findOne({where:{email},include:User})
        return res.json(mentor)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// POST mentor create
router.post('/create', async (req, res) => {
    try {
        const firstName = req.body.name
        const lastName = req.body.surname
        const scienceTitle = req.body.scienceTitle
        const email = req.body.email
        const candidate = await Mentor.findOne({where:{email}})
        if(candidate){
            return res.json({message:'Ви вже зарестровані!', exists:true})
        }
        await Mentor.create({firstName,lastName,scienceTitle,email})
        res.json('Ви зареєструвалися як научний керівник!')
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// GET mentors students
router.post('/students',urlencodedParser, async (req, res) => {
    try {
        const email= req.body.email
        const mentor = await Mentor.findOne({where:{email},include:User})
        const students = await User.findAll({where:{mentorId:mentor.id},include:Speciality})
        return res.json(students)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})



module.exports = router

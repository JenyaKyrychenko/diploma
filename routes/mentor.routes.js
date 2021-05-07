const {Router} = require('express')
const Mentor = require('./../models/Mentor')
const User = require('./../models/User')
const Speciality = require('./../models/Speciality')
const router = Router()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false});

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
router.post('/students', async (req, res) => {
    try {
        const email= req.body.email
        const candidate = await Mentor.findOne({where:{email},include:User})
        return res.json(candidate.users)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})



module.exports = router

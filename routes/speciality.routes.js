const {Router} = require('express')
const User = require('./../models/User')
const Mentor = require('./../models/Mentor')
const Speciality = require('../models/Speciality')
const router = Router()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET specialitys
router.get('/', async (req, res) => {
    try {
        const specialitys = await Speciality.findAll()
        res.json(specialitys)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// /api/speciality/users/:id/add
// POST speciality for student
router.post('/users/:id/add', async (req, res) => {
    try {
        const specialityCode = req.body.specialityCode
        const id = req.params.id
        const user = await User.findOne({where:{id},include:Speciality})
        const speciality = await Speciality.findOne({where:{specialityCode},include:User})
        await speciality.addUser(user)
        res.json('Спеціальність обрана!')
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// GET specislity's students List by ID
router.get('/:id/users', async (req, res) => {
    try {
        const id = req.params.id
        const speciality = await Speciality.findOne({where:{id},include:User})
        res.json(speciality.users)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// POST mentor to speciality by SpecialityCode
router.post('/:code/mentor/add', async (req, res) => {
    try {
        const specialityCode = req.params.code
        const mentorEmail = req.body.email
        const speciality = await Speciality.findOne({where:{specialityCode},include:Mentor})
        const mentor = await Mentor.findOne({where:{email:mentorEmail},include:Speciality})
        mentor.addSpeciality(speciality)
        res.json('Спеціальність обрана!')
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// GET mentors list on speciality
router.get('/:id/mentors', async (req, res) => {
    try {
        const id = req.params.id
        const speciality = await Speciality.findOne({where:{id},include:Mentor})
        res.json(speciality.mentors)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})



module.exports = router

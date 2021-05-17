const {Router} = require('express')
const User = require('./../models/User')
const ResearchWork = require('./../models/ResearchWork')
const router = Router()
const bodyParser = require('body-parser')
const loadDocument = require('../FileTemplater')
const fs = require('fs')
const path = require('path')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET /api/researchwork/
router.post('/user/:id/add', async (req, res) => {
    try {
        const id = req.params.id
        const text = req.body.text
        let researchWork = await ResearchWork.findOne({where: {userId: id}})
        if (researchWork) {
            researchWork.text = text
            researchWork.save()
        } else {
            researchWork = await ResearchWork.create({text})
        }
        const user = await User.findOne({where: {id}, include: ResearchWork})
        user.addResearchWork(researchWork)
        loadDocument('researchwork', {name: user.firstName, text}, user.email)
        res.json('Ok!')
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})

// download file
router.post('/', urlencodedParser, async (req, res) => {
    try {
        const fileName = req.body.fileName
        const email = req.body.email
        const result = fs.existsSync(path.resolve('./CompletedFiles', `${fileName}_${email}.docx`))
        if (!result) {
            return res.status(503).json()
        } else {
            res.download(`D:/Код/Diploma/CompletedFiles/${fileName}_${email}.docx`)
        }
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})


module.exports = router

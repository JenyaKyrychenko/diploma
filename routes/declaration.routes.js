const {Router} = require('express')
const User = require('./../models/User')
const Declaration = require('./../models/Declaration')
const router = Router()
const bodyParser = require('body-parser')
const loadDocument = require('../FileTemplater')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// GET /api/declaration/
router.post('/user/:id/add', async (req, res) => {
    try {
        const id = req.params.id
        const name = req.body.name
        const surname = req.body.surname
        const nationality = req.body.nationality
        const birthday = req.body.birthday
        const passportId = req.body.passport
        const gender = req.body.gender
        const schoolGraduateDate = req.body.school
        const address = req.body.address
        const phoneNumber = req.body.phone
        const email = req.body.email
        const language = req.body.language

        let declaration = await Declaration.findOne({where: {userId: id}})
        if (declaration) {
            declaration.name = name
            declaration.surname = surname
            declaration.nationality = nationality
            declaration.birthday = birthday
            declaration.passportId = passportId
            declaration.gender = gender
            declaration.schoolGraduateDate = schoolGraduateDate
            declaration.address = address
            declaration.phoneNumber = phoneNumber
            declaration.email = email
            declaration.language = language
            declaration.save()
        } else {
            declaration = await Declaration.create({
                name,
                surname,
                nationality,
                birthday,
                passportId,
                gender,
                schoolGraduateDate,
                address,
                phoneNumber,
                email,
                language
            })
        }
        const user = await User.findOne({where: {id}, include: Declaration})
        user.setDeclaration(declaration)
        loadDocument('declaration', {
            name,
            surname,
            nationality,
            birthday,
            passportId,
            gender,
            schoolGraduateDate,
            address,
            phoneNumber,
            email,
            language
        },user.email)
        res.json('Ok!')
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})


module.exports = router

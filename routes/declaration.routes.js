const {Router} = require('express')
const User = require('./../models/User')
const Declaration = require('./../models/Declaration')
const router = Router()
const bodyParser = require('body-parser')
const loadDocument = require('../FileTemplater')

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/user/:userId/add', async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findOne({where:{id:userId},include:Declaration})
        const userEmail = user.email
        const form = {...req.body}

        let declaration = await Declaration.findOne({where:{userId}})
        if(declaration){
            declaration.update({...form})
            declaration.save()
        } else {
            declaration = await Declaration.create({...form})
            user.setDeclaration(declaration)
        }

        loadDocument('declaration', {
            ...form
        },userEmail)
        res.json({message:'Заяву збережено!'})
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так!'})
        console.log(e)
    }
})


module.exports = router

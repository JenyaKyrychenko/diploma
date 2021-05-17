const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('./../models/User')
const Speciality = require('./../models/Speciality')
const Mentor = require('./../models/Mentor')
const router = Router()
const bodyParser = require('body-parser')
const {Op} = require('sequelize')

const urlencodedParser = bodyParser.urlencoded({extended: false});

// /api/auth/registration
router.post('/registration',
    [
        check('email', 'Некоректный email').isEmail(),
        check('firstName', 'Введите имя').isString().not(Number).isEmpty(),
        check('lastName', 'Введите фамилию').isString().not(Number).isEmpty(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }
            const {firstName, lastName, email, password, repeatPassword} = req.body

            if (password !== repeatPassword) {
                return res.status(400).json({message: 'Повторите пароль!'})
            }

            const candidate = await User.findOne({where: {email}})

            if (candidate) {
                return res.status(400).json({message: 'Пользователь с такой почтой уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            await User.create({firstName, lastName, email, password: hashedPassword})

            res.status(201).json({message: 'Пользователь создан!'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так!'})
        }
    })

// /api/auth/login
router.post('/login',
    [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').exists()

    ], async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({where: {email}})

            if (!user) {
                return res.status(400).json({message: 'Позьзователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль!'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id, status: user.status})


        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так!'})
        }
    })

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({include: Speciality})
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
    }
})

// GET all Students
router.get('/users/students', async (req, res) => {
    try {
        const users = await User.findAll({
            where: {status: 'student'},
            include: [{model: Speciality}, {model: Mentor}]
        })
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
        console.log(e)
    }
})

// GET all Students who have not mentor
router.get('/users/students/nomentor', async (req, res) => {
    try {
        const users = await User.findAll({
            where: {status: 'student', mentorId:null},
            include: [{model: Speciality}, {model: Mentor}]
        })
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
        console.log(e)
    }
})

// GET all students By SeachValue
router.post('/users/students/search', async (req, res) => {
    try {
        const searchValue = req.body.searchValue
        const users = await User.findAll({
            where: {
                status: 'student',
                [Op.or]: [{lastName: {[Op.substring]: searchValue}},
                    {firstName: {[Op.substring]: searchValue}},
                    {email: {[Op.substring]: searchValue}}]
            },
            include: [{model: Speciality}, {model: Mentor}]
        })
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
        console.log(e)
    }
})

// GET all students By Speciality
router.post('/users/students/search/speciality', async (req, res) => {
    try {
        const searchSpeciality = req.body.searchSpeciality
        const users = await User.findAll({
            where: {
                status: 'student',
            },
            include: [{model: Speciality,where:{specialityCode:searchSpeciality}}, {model: Mentor}]
        })
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
        console.log(e)
    }
})

// getByID
// /api/user/:id
router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({where: {id}, include: Speciality})
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
    }
})

module.exports = router

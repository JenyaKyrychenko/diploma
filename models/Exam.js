const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')
const Speciality =require('./Speciality')
const User = require('./User')

const Exam = sequelize.define("exam", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    examDate: {
        type: Sequelize.DATE,
        required: true,
        allowNull: false
    },
    examAddress: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    subjectExam: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

Speciality.hasMany(Exam)
Exam.belongsTo(Speciality)


User.belongsToMany(Exam,{through:'ExamHasUsers'})
Exam.belongsToMany(User,{through:'ExamHasUsers'})



module.exports = Exam
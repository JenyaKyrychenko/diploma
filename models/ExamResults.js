const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')
const Exam = require('./../models/Exam')
const User = require('./User')
const Speciality = require('./Speciality')

const ExamResults = sequelize.define("examresults", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    examMark:{
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

User.hasOne(ExamResults)
ExamResults.belongsTo(User)

Exam.hasMany(ExamResults)
ExamResults.belongsTo(Exam)

Speciality.hasMany(ExamResults)
ExamResults.belongsTo(Speciality)

module.exports = ExamResults
const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')
const Mentor = require('./Mentor')
const User = require('./User')

const Speciality = sequelize.define("speciality", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    specialityCode: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    specialityName: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    industryCode: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    industryName: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

Speciality.belongsToMany(Mentor,{through: 'MentorHasSpeciality'})
Mentor.belongsToMany(Speciality,{through: 'MentorHasSpeciality'})

Speciality.hasMany(User)
User.belongsTo(Speciality)

module.exports = Speciality
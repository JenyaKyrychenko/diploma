const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')
const User = require('./User')

const Mentor = sequelize.define("mentor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        required: true,
        unique: false,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        required: true,
        unique: false,
        allowNull: false
    },
    scienceTitle: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        required: true,
        allowNull: false
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

Mentor.hasMany(User)
User.belongsTo(Mentor)

module.exports = Mentor
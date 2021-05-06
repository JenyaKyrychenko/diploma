const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')
const User = require('./User')

const Declaration = sequelize.define("declaration", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    passportId: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE,
        required:true,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    schoolGraduateDate: {
        type: Sequelize.DATE,
        required:true,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        required:true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    language: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

User.hasOne(Declaration)
Declaration.belongsTo(User)


module.exports = Declaration
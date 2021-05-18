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
    firstName: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    patronymic: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    formOfEducation: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    competitiveOffer: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    speciality: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    educationProgram: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    educationDegree: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    contract: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    budget: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    wasStudied: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    wasGraduated: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    language: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    specialConditions: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    gpa: {
        type: Sequelize.INTEGER,
        required:true,
        allowNull: false
    },
    hostel: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE,
        required:true,
        allowNull: false
    },
    placeOfBirth: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    street: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    house: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    flatNumber: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    district: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    region: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },
    index: {
        type: Sequelize.INTEGER,
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
    additionalInfo: {
        type: Sequelize.STRING,
        required:true,
        allowNull: false
    },

},{
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

User.hasOne(Declaration)
Declaration.belongsTo(User)


module.exports = Declaration
const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')

const User = sequelize.define("user", {
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
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        defaultValue: 'student'
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = User
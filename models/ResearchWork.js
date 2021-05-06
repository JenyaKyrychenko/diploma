const Sequelize = require('sequelize')
const sequelize = require('./../Database/connect')
const User = require('./User')

const ResearchWork = sequelize.define("researchWork", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

User.hasMany(ResearchWork)


module.exports = ResearchWork
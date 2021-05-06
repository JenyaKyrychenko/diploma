const Sequelize = require('sequelize')

const sequelize = new Sequelize('diploma', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamp: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
})

sequelize.sync()

module.exports = sequelize
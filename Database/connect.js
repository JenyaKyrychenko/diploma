const Sequelize = require('sequelize')

const sequelize = new Sequelize('test_sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamp: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
})

const connect= async ()=>{
    try {
        sequelize.sync()
    }catch (e) {
        console.log('Error: '+e)
    }

}

connect()

// sequelize.sync({alter:true})
// sequelize.sync({force:true})
// sequelize.sync()

module.exports = sequelize
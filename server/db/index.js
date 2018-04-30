const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/coffee-maker', {
    logging: false
  }
)

const Log = db.define('log', {
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    coffeeBean: {
        type: Sequelize.STRING
    },
    grindLevel: {
        type: Sequelize.ENUM("Medium-Coarse Grind", "Medium Grind", "Medium-Fine Grind")
    }, 
    coffeeBeanAmount: {
        type: Sequelize.INTEGER
    },
    waterAmount: {
        type: Sequelize.INTEGER
    },
    comment: {
        type: Sequelize.STRING
    },
    love:{
        type: Sequelize.BOOLEAN
    }
})

module.exports = {Log, db} ;

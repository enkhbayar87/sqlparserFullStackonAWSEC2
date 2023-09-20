const Sequelize = require("sequelize")

var mySqlParserDB = {};

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    'host': process.env.MYSQL_HOST, 
    'port': process.env.MYSQL_PORT,
    'dialect': process.env.MYSQL_DIALECT, 
    'define': {
        freezeTableName: true,
    },
  
    pool: {
        max: 10,
        min: 0,
        acquire: 6000,          
        idle: 10000,            
    },
    operatorAliases: false      
});

const models = [
    require('../models/parser')
]

models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    mySqlParserDB[seqModel.name] = seqModel;                   
})
mySqlParserDB.sequelize = sequelize;
module.exports = mySqlParserDB
module.exports = function(sequelize, DataTypes){
    return sequelize.define('parser', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        originalText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        parseText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },{
        tableName: 'parser_texts',       
        timestamps: true,                 
    });
}
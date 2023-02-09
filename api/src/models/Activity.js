const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
        type: DataTypes.STRING,
        autoincrement: true, 
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true 
    },
    difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5")
    }, 
    //TODO: hacerlo como INTERGER y validar que sea de 1 a 5
    //allowNull: false
    //validate{ min 1, max 5}
    
    duration: {
        type: DataTypes.STRING, 
    },
    season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera")
    }

  
  });
};

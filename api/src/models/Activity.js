const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoincrement: true, 
        primaryKey: true,
        // allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true 
    },
    difficulty: {
        type: DataTypes.INTEGER,
        validate: {min: 1, max: 5},
        allowNull: false
    }, 

    
    duration: {
        type: DataTypes.INTEGER, 
    },
    season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera")
    },
    

  }, 
    {timestamp: false}
  );
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {      
      allowNull: false,
      type: DataTypes.STRING, 
      primaryKey: true,

  }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    flag : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    continents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.FLOAT
    },
    population: {
      type: DataTypes.FLOAT
    }
  });
};

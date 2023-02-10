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
    },
    capital: {
      type: DataTypes.STRING,
      //allowNull: false //TODO agregarlo despues para que no se caiga la db
      //! ojo que hay algunos que no traen capital... hacer con ternario si tiene y sino msj de error
    },
    flag : {
      type: DataTypes.STRING,
      allowNull: false,

    }, 
    continent: {
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
  }, 
    {timestamp: false}
  );
};

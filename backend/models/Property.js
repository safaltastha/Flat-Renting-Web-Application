const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      category: {
        type: DataTypes.ENUM("flat", "room", "apartment"),
        allowNull: false,
      },
      locationCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationStreetNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numOfSpaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numOfBedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numOfLivingrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numOfBathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numOfKitchens: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monthlyRent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      advancedRent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      features: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      houseRule: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
//Photos and videos chai db ma save hunna hai
      photo: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },

      video: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model : Users,
      //     key: 'id' 
      //   },
      //   allowNull: false,
      // },
    },
    
    {
      timestamps: true,
      tableName: "properties",
    }
  );

  // Users.associte = (models)=> {
  //   Users.hasMany(models.Property,{
  //     foreignKey: 'userId' ,
  //     onDelete:  "cascade"
  //   })
  // }
  return Property;
};

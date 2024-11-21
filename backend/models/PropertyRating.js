// models/PropertyRating.js
module.exports = (sequelize, DataTypes) => {
    const PropertyRating = sequelize.define("PropertyRating", {
      rating_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      property_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties', // This should match the name of your Properties table
          key: 'id',
        },
      },
      rater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // This should match the name of your Users table
          key: 'id',
        },
      },
    });
  
    PropertyRating.associate = (models) => {
      // Association with Property
      PropertyRating.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property' });
      // Association with User (rater)
      PropertyRating.belongsTo(models.Users, { foreignKey: 'rater_id', as: 'rater' });
    };
  
    return PropertyRating;
  };
  
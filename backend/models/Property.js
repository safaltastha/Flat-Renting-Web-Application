module.exports=(sequelize,DataTypes)=>{

    const Property=sequelize.define("Property",{
        category: {
            type: DataTypes.ENUM('flat', 'room', 'apartment'),
            allowNull: false,
          },
          // Location: city, street number
          locationCity: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          locationStreetNumber: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          // Number of spaces, bedrooms, bathrooms, and kitchens
          numOfSpaces: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          numOfBedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          numOfBathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          numOfKitchens: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          // Rent details
          monthlyRent: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },
          advancedRent: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true, // Optional field
          },
          // Features included: electricity, parking, wifi, pet
          features: {
            type: DataTypes.JSON, // Store features as a JSON object
            allowNull: true,
          },
          // Description
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          // House rule
          houseRule: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          // Photo and video
          photoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          videoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        }, {
          timestamps: true, 
           tableName: 'properties'
        
    })

    return Property;
}
'use strict';
module.exports = function(sequelize, DataTypes) {
  var saved = sequelize.define('saved', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return saved;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var saved = sequelize.define('saved', {
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return saved;
};
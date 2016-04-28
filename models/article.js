'use strict';
module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define('article', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    pubdate: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.article.belongsToMany(models.user, {through: models.saved})
      }
    }
  });
  return article;
};
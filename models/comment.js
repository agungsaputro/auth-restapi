'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Author);
      this.belongsTo(models.Post);
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    status:{
      type: DataTypes.ENUM,
      values: ["true", "false"],
    },
    create_time: DataTypes.DATE,
    email_user: DataTypes.STRING,
    url: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
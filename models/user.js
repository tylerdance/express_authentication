'use strict';
const bcrypt = require('bcrypt'); // make hash password for user
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [12,99],
          msg: 'Password must be between 12 and 99 characters'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};

user.addHook('beforeCreate', function(pendingUser) {
  // bcrypt hash a password
  let hash = bcrypt.hashSync(pendingUser.password, 12);

  // set password to equal the hash
  pendingUser.password = hash;
});

user.prototype.validPassword = function(passwordTyped) {
  let correctPassword = bcrypt.compareSync(passwordTyped, this.password);

  // return true or false based on if password is correct
  return correctPassword;
}

// remove password before it gets serialized
user.prototype.toJSON = function() {
  let userData = this.get();
  delete userData.password;
  return userData;
}

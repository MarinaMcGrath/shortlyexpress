const db = require('../config');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');


const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,
  initialize: function() {
    this.on('creating', function (model, attrs, options) {
      bcrypt.hash(model.get('password'), null, null, (err, hash) => {
        model.set('password', hash);
      });
    });
  }
});

module.exports = User;
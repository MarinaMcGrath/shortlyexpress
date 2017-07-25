const db = require('../config');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');


const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,
  initialize: function() {
    this.on('creating', function (model, attrs, options) {
      return new Promise((res, rej) => {
        bcrypt.hash(model.get('password'), null, null, (err, hash) => {
          err ? rej(err) : res(model.set('password', hash));
        });
      });  
    });
  }
});

module.exports = User;
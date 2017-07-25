const request = require('request');
const bcrypt = require('bcrypt-nodejs');

exports.getUrlTitle = (url, cb) => {
  request(url, (err, res, html) => {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      const tag = /<title>(.*)<\/title>/;
      const match = html.match(tag);
      const title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

const rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = url => url.match(rValidUrl);


/************************************************************/
// Add additional utility functions below
/************************************************************/
 exports.checkUser = (key, hash, cb) => bcrypt.compare(key, hash, (err, res) => err ? cb(err, null) : cb(null, res));



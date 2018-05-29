var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.test = functions.database
  .ref('/restaurant/restaurant/{restaurantUid}')
  .onWrite((change, context) => {
    console.log(change);
  });

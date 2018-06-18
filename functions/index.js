const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.database
  .ref('root/users/{id}/following')
  .onUpdate((snapshot, context) => {
    const after = snapshot.after.val();
    const before = snapshot.before.val();
    if (after.length > before.length) {
      admin
        .database()
        .ref(`root/users/${after[after.length - 1]}`)
        .once('value', snap => {
          const user = snap.val();
          console.log('users', user);
          const payload = {
            notification: {
              title: 'You have a new follower!',
              body: `${after.fullName} is now following you.`
            }
          };
          console.log('token', user.token);

          return admin.messaging().sendToDevice(user.token, payload);
        });
    }
    return 1;
  });

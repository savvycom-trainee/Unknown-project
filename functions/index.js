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
          admin
            .database()
            .ref(`root/users/${context.params.id}`)
            .once('value', snap1 => {
              const follower = snap1.val();
              const payload = {
                data: {
                  uid: follower.uid
                },
                notification: {
                  title: 'You have a new follower!',
                  body: `${follower.fullName} is now following you.`
                }
              };
              console.log(user.token, payload);
              return admin.messaging().sendToDevice(user.token, payload);
            });
        });
    }
    return 1;
  });

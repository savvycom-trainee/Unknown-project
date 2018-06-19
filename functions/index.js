const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.database
  .ref('root/users/{id}/following')
  .onUpdate((snapshot, context) => {
    const after = snapshot.after.val();
    const before = snapshot.before.val();
    // console.log(after.length, after);
    // console.log('id', context.params.id);
    if (after.length > before.length) {
      admin
        .database()
        .ref(`root/users/${context.params.id}`)
        .once('value', snap => {
          const user = snap.val();
          console.log('users', snap.val());
          const payload = {
            notification: {
              title: 'You have a new follower!',
              body: `${after.fullName} is now following you.`
            }
          };
          return admin.messaging().sendToDevice(user.token, payload);
        });
    }
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

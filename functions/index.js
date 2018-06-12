const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// exports.sendPushNotification = functions.database
// .ref('restaurant/user/{id}')
// .onUpdate(event => {
//   const after = event.after.val();
//   const before = event.before.val();
//   console.log('event', event);
//   if (after.follower.length > before.follower.length) {
//     // const
//     const payload = {
//       notification: {
//         title: 'Thông báo',
//         body: 'Có người theo dõi bạn'
//       }
//     };
//     return admin.messaging().sendToDevice(after.token, payload);
//   }
//   // if (after.length > before.length) {
//   //   const index = after.length - 1;
//   //   console.log('uid', after[index]);

//   const db = admin.database();
//   // log
//   const ref = db.ref('restaurant/user');
//   ref
//     .once('value')
//     .then(snapshot => console.log('snapshot,', snapshot))
//     .catch(err => console.log(err));

//   // admin
//   //   .database()
//   //   .ref('retaurant/user')
//   //   .child(after[index])
//   //   .once('value')
//   //   .then(snapshot => {
//   //     console.log('snapshot', snapshot);
//   //     let payload = {};
//   //     return admin.messaging().sendTodevice(snapshot.token, payload);
//   //   })
//   //   .catch(err => console.log(err));
//   // admin
//   //   .database()
//   //   .ref(`retaurant/restaurant/user`)
//   //   .once('value', snapshot => console.log('snapshot', snapshot))
//   //   .then(snapshot => console.log(snapshot))
//   //   .catch(err => console.log(err));
//   return admin
//     .database()
//     .ref('retaurant/user')
//     .once('value', snapshot => {
//       console.log('return', snapshot.val());
//     });
// });
exports.pushNofi = functions.database
  .ref('restaurant/user/{id}/follower')
  .onUpdate(event => {
    console.log('event follower', event);
    functions.database.ref('restaurant/user/{id}/followed').onUpdate(event1 => {
      console.log('event1', event1);
    });
    admin.firestore.QuerySnapshot();
    // admin
    //   .databfirease()
    //   .ref(event.after._path)
    //   .once('value')
    //   .then(snapshot => {
    //     console.log('snapshot', snapshot);
    //     console.log(
    //       'snapshot.node_.children_.root_',
    //       snapshot.node_.children_.root_
    //     );
    //     console.log(
    //       'snapshot.node_.priorityNode_',
    //       snapshot.node_.priorityNode_
    //     );
    //     return 1;
    //   })
    //   .catch(err => console.log(err));
  });

var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendFollowerNotification = functions.database
  .ref('/followers/{followedUid}/{followerUid}')
  .onWrite((change, context) => {
    const followerUid = context.params.followerUid;
    const followedUid = context.params.followedUid;
    // If un-follow we exit the function.
    if (!change.after.val()) {
      return console.log('User ', followerUid, 'un-followed user', followedUid);
    }
    console.log(
      'We have a new follower UID:',
      followerUid,
      'for user:',
      followerUid
    );

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin
      .database()
      .ref(`/users/${followedUid}/notificationTokens`)
      .once('value');

    // Get the follower profile.
    const getFollowerProfilePromise = admin.auth().getUser(followerUid);

    // The snapshot to the user's tokens.
    let tokensSnapshot;

    // The array containing all the user's tokens.
    let tokens;

    return Promise.all([getDeviceTokensPromise, getFollowerProfilePromise])
      .then(results => {
        tokensSnapshot = results[0];
        const follower = results[1];

        // Check if there are any device tokens.
        if (!tokensSnapshot.hasChildren()) {
          return console.log('There are no notification tokens to send to.');
        }
        console.log(
          'There are',
          tokensSnapshot.numChildren(),
          'tokens to send notifications to.'
        );
        console.log('Fetched follower profile', follower);

        // Notification details.
        const payload = {
          notification: {
            title: 'You have a new follower!',
            body: `${follower.displayName} is now following you.`,
            icon: follower.photoURL
          }
        };

        // Listing all tokens as an array.
        tokens = Object.keys(tokensSnapshot.val());
        // Send notifications to all tokens.
        return admin.messaging().sendToDevice(tokens, payload);
      })
      .then(response => {
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error(
              'Failure sending notification to',
              tokens[index],
              error
            );
            // Cleanup the tokens who are not registered anymore.
            if (
              error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered'
            ) {
              tokensToRemove.push(
                tokensSnapshot.ref.child(tokens[index]).remove()
              );
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
  });

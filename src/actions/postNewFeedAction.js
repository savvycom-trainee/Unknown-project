import firebase from 'react-native-firebase';

import {
  POST_NEWFEED_ING,
  POST_NEWFEED_SUCCESS,
  POST_NEWFEED_FAIL,
} from '../constants/actionTypes';

export function postNewFeed() {
  return {
    type: POST_NEWFEED_ING,
  };
}
export function postNewFeedSuccess() {
  return {
    type: POST_NEWFEED_SUCCESS,
  };
}
export function postNewFeedFail() {
  return {
    type: POST_NEWFEED_FAIL,
  };
}
export function fetchPostNewFeed(post, restaurant) {
  return (dispatch) => {
    dispatch(postNewFeed());
    const idRestaurant = restaurant.idRestaurant;
    console.log(idRestaurant);
    console.log(post);
    // firebase
    //   .database()
    //   .ref('/root/restaurants')
    //   .orderByChild('idRestaurant')
    //   .equalTo(`${idRestaurant}`)
    //   .on('value', (snapshot) => {
    //     const newPost = snapshot.val();
    //     if (newPost === null) {
    //       console.log(newPost);
    //       console.log('sjjddds');
    //       firebase
    //         .database()
    //         .ref('root/posts/')
    //         .push(post)
    //         .then(
    //           (snapshot) => {
    //             console.log(snapshot);
    //             firebase
    //               .database()
    //               .ref(`/root/restaurants/${idRestaurant}`)
    //               .set(restaurant);
    //           },
    //           (error) => {
    //             // The Promise was rejected.
    //             console.error(error);
    //           },
    //         );
    //     } else {
    //       console.log('hihi');
    //       const a = 'sksksk';
    //       firebase
    //         .database()
    //         .ref(`/root/restaurants/${idRestaurant}`)
    //         .child('review')
    //         .set(post)
    //         .then(
    //           (snapshot) => {
    //             // The Promise was rejected.
    //             console.log(snapshot);
    //             console.log('ok');
    //           },
    //           (error) => {
    //             // The Promise was rejected.
    //             console.error(error);
    //           },
    //         );
    //     }
    //   });
    firebase
      .database()
      .ref('root/posts/')
      .push(post)
      .on('value', (postSnapshot) => {
        console.log(postSnapshot._value);
        console.log(postSnapshot.key);
        firebase
          .database()
          .ref('/root/restaurants')
          .orderByChild('idRestaurant')
          .equalTo(`${idRestaurant}`)
          .once('value')
          .then((restaurantSnapshot) => {
            console.log(restaurantSnapshot._value);
            if (restaurantSnapshot._value !== null) {
              firebase
                .database()
                .ref(`/root/restaurants/${idRestaurant}/review`)
                .child(postSnapshot.key)
                .set(postSnapshot.key);
            } else {
              firebase
                .database()
                .ref('/root/restaurants/')
                .child(`${idRestaurant}`)
                .set(restaurant)
                .then(firebase
                  .database()
                  .ref(`/root/restaurants/${idRestaurant}`)
                  .child('review')
                  .child(postSnapshot.key)
                  .set(postSnapshot.key));
            }
          });
      });
  };
}

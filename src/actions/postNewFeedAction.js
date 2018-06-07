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
    const ref = firebase
      .database()
      .ref('root/posts/')
      .push(post).key;
    console.log('aaaskks', ref);
    if (ref !== null) {
      firebase
        .database()
        .ref('/root/restaurants')
        .orderByChild('idRestaurant')
        .equalTo(`${idRestaurant}`)
        .on('value', (snapshot) => {
          const newPost = snapshot.val();
          if (newPost === null) {
            const obj = restaurant;
            const obj2 = { idPost: ref };
            Object.assign(obj, obj2);
            firebase
              .database()
              .ref(`/root/restaurants/${idRestaurant}`)
              .set(obj)
              .then(
                (snapshot) => {
                  // The Promise was rejected.
                  console.log(snapshot);
                  console.log('ok');
                },
                (error) => {
                  // The Promise was rejected.
                  console.error(error);
                },
              );
          } else {
            const newPost = snapshot.val();
            console.log(newPost.idRestaurant);
            console.log('hihi');
            // const a = 'sksksk';
            // firebase
            //   .database()
            //   .ref(`/root/restaurants/${idRestaurant}`)
            //   .child('idPost')
            //   .push(ref);
          }
        });
    }
  };
}

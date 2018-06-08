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
    firebase
      .database()
      .ref('root/posts/')
      .push(post)
      .on('value', (postSnapshot) => {
        console.log(postSnapshot._value);
        console.log(postSnapshot.key);
        dispatch(postNewFeedSuccess());
        firebase
          .database()
          .ref(`/root/users/${post.idUser}`)
          .child('pin')
          .child(postSnapshot.key)
          .set(postSnapshot.key);

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

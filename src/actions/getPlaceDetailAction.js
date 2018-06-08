import axios from 'axios';
import firebase from 'react-native-firebase';

import {
  GET_PLACEDETAIL_ING,
  GET_PLACEDETAIL_SUCCESS,
  GET_PLACEDETAIL_FAIL,
} from '../constants/actionTypes';

export function getPlaceDetail() {
  return {
    type: GET_PLACEDETAIL_ING,
  };
}

export function getPlaceDetailSuccess(data) {
  return {
    type: GET_PLACEDETAIL_SUCCESS,
    payload: data,
  };
}
export function getPlaceDetailFail() {
  return {
    type: GET_PLACEDETAIL_FAIL,
  };
}

export function fetchDatagetPlaceDetail(id) {
  return (dispatch) => {
    dispatch(getPlaceDetail());
    console.log('firebase');

    firebase
      .database()
      .ref('root/restaurants')
      .on('value', (snapshot) => {
        const checkInFirebase = snapshot.val().hasOwnProperty(id);
        console.log(checkInFirebase);

        // find restaurant in firebase
        if (checkInFirebase) {
          // dispatch(getPlaceDetailSuccess(dataFromFirebase.id));
          firebase
            .database()
            .ref(`root/restaurants/${id}`)
            .on('value', (snapshot1) => {
              console.log(snapshot1.val());

              dispatch(getPlaceDetailSuccess(snapshot1.val()));
            });
        }
        // if dont have
        else {
          axios
            .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyBftI7qlfXFzlklaejl63pyeO8J9kivXys`)
            .then((response) => {
              if (response.data.status == 'OK') {
                console.log(response.data.result);

                const data = {
                  idRestaurant: id,
                  location: {
                    lat: response.data.result.geometry.location.lat,
                    lng: response.data.result.geometry.location.lng,
                  },
                  name: response.data.result.name,
                  photos: response.data.result.photos,
                  rating: response.data.result.rating,
                  city: response.data.result.address_components[0].long_name,
                  vicinity: response.data.result.formatted_address,
                };
                console.log(data.vincinity);

                firebase
                  .database()
                  .ref(`root/restaurants/${id}`)
                  .set(data);
                dispatch(getPlaceDetailSuccess(data));
              } else {
                firebase
                  .database()
                  .ref('root/restaurants/ChIJ5wFaYfKrNTERKqOASecEi3k')
                  .on('value', (snapshot1) => {
                    console.log(snapshot1.val());
                    dispatch(getPlaceDetailSuccess(snapshot1.val()));
                  });
              }
            })
            .catch((error) => {
              console.log(error);
              dispatch(getPlaceDetailFail(error));
            });
        }
      });
  };
}

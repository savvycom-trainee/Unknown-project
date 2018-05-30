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
export function fetchPostNewFeed(obj) {
  // const Blob = RNFetchBlob.polyfill.Blob;
  // const fs = RNFetchBlob.fs;
  // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  // window.Blob = Blob;
  // const uploadImage = (uri, mime = 'application/octet-stream') =>
  //   new Promise((resolve, reject) => {
  //     console.log(uri);
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  //     const sessionId = new Date().getTime();
  //     let uploadBlob = null;
  //     const imageRef = storage.ref('images').child(`${sessionId}`);
  //     console.log('kdkkd', uploadUri);
  //     fs
  //       .readFile(uploadUri, 'base64')
  //       .then(data => Blob.build(data, { type: `${mime};BASE64` }))
  //       .then((blob) => {
  //         console.log('kdkwkd', blob);
  //         uploadBlob = blob;
  //         return imageRef.put(blob, { contentType: mime });
  //       })
  //       .then(() => {
  //         uploadBlob.close();
  //         return imageRef.getDownloadURL();
  //       })
  //       .then((url) => {
  //         resolve(url);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });

  return (dispatch) => {
    dispatch(postNewFeed());
    try {
      firebase
        .database()
        .ref('restaurant/restaurant/')
        .push(obj);

      // const file = obj.photos;
      // // firebase
      // //   .storage()
      // //   .ref('/files/1234')
      // //   .putFile('/path/to/file/1234')
      // //   .then((uploadedFile) => {
      // //     // success
      // //   })
      // //   .catch((err) => {
      // //     // Error
      // //   });
      // const storage = firebase.storage();
      // const sessionId = new Date().getTime();
      // const imageRef = storage.ref('images').child(`${sessionId}`);
      // imageRef
      //   .putFile(file[0])
      //   .then((uploadedFile) => {
      //     console.log('ok', uploadedFile);
      //   })
      //   .catch((err) => {
      //     // Error
      //     console.log(err);
      //   });
      // console.log('ádasd', imageRef.path);
      // const ref = firebase.storage().ref('images/1527577866158');
      // // imageRef.close();
      // ref.getDownloadURL().then((url) => {
      //   console.log(url);
      // });

      // Create the file metadata

      dispatch(postNewFeedSuccess());
    } catch (error) {
      dispatch(postNewFeedFail(error));
    }
  };
}

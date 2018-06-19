import { StyleSheet } from 'react-native';
import { Colors } from '../../../themes';
import * as d from '../../../utilities/Tranform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewHead: {
    padding: 14,
    backgroundColor: Colors.default,
    flex: 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewTextHead: {
    alignContent: 'center',
  },
  viewNameAndRes: {
    flexDirection: 'row',
  },
  body: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  viewContent: {
    flex: 0.9,
  },
  imgClose: {
    // width: 20,
    // height: 20,
  },
  viewFromSearch: {
    flexDirection: 'row',
  },
  buttonSearch: {
    paddingRight: 5 * d.ratioW,
  },
  ImageAvatar: {
    height: 50 * d.ratioH,
    width: 50 * d.ratioW,
    borderRadius: 25,
  },
  viewFormAddSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    marginLeft: 14,
    height: 25 * d.ratioH,
    width: 110 * d.ratioW,
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 6,
  },
  viewFormUserName: {
    padding: 0,
    marginLeft: 14 * d.ratioW,
    height: 25 * d.ratioH,
    width: 130 * d.ratioW,
  },
  ViewButtonSearch: {
    padding: 3,
  },
  textPosted: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.white,
  },
  textPost: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(19,19,19,0.8)',
  },
  textCreatePost: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
  textCancelPost: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.white,
  },
  textButtonPost: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  textAddPost: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  viewTextInputSearch: {
    paddingBottom: 10 * d.ratioH,
  },
  ViewContentFlatList: {
    marginTop: 10 * d.ratioH,
    flex: 0.84,
    width: 360 * d.ratioW,
    padding: 1,
  },
  ViewItemFlatList: {
    padding: 10,
  },
  textHeadNear: {
    color: Colors.text,
    padding: 34,
    fontSize: 24,
    fontWeight: '700',
  },
  viewItemAdd: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textItemName: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  ViewHeadFlatList: {
    paddingTop: 30 * d.ratioH,
    width: 350 * d.ratioW,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60 * d.ratioH,
  },
  textSelected: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
    paddingBottom: 10 * d.ratioH,
  },
  textSelectedShow: {
    width: 90 * d.ratioW,
    paddingLeft: 2,
    color: Colors.text,
    fontSize: 10,
    fontWeight: '800',
  },
  viewImageSelected: {
    // backgroundColor: '#445',
    padding: 14,
    width: null,
    height: 100 * d.ratioH,
  },
  textSelectedAdd: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 10 * d.ratioH,
  },
  ViewButton: {
    paddingTop: 10 * d.ratioH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTextInput: {
    paddingBottom: 10 * d.ratioH,
  },
  textInput: {
    padding: 0,
    paddingLeft: 10,
    borderRadius: 2.5,
    width: 350 * d.ratioW,
    height: 50 * d.ratioH,
    fontSize: 20,
    fontWeight: '400',
  },
  textInputSearch: {
    padding: 0,
    paddingLeft: 10,
    borderRadius: 2.5,
    width: 298 * d.ratioW,
    height: 50 * d.ratioH,
    borderBottomColor: Colors.textOpacity,
    borderBottomWidth: 0.3,
  },
  viewImage: {
    // backgroundColor: '#990',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewFormImageUser: {
    justifyContent: 'center',
    height: 50 * d.ratioH,
    width: 50 * d.ratioW,
  },
  viewInfoDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 14,
    width: '100%',
    height: 80 * d.ratioH,
    // backgroundColor: '#049',
  },
  viewCamera: {
    flex: 0.5,
    height: 150 * d.ratioH,
  },
  camera: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 300 * d.ratioH,
  },
  viewPhotoMobile: {
    flex: 0.5,
    height: 300 * d.ratioH,
  },

  viewform: {
    alignItems: 'center',
  },
  Form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imagePhotoItem: {
    borderColor: Colors.white,
    borderWidth: 0.4,
    height: 95.7 * d.ratioH,
    width: 95.7 * d.ratioW,
  },
  imagePhotoSelectedItem: {
    borderColor: Colors.white,
    borderWidth: 0.4,
    height: 70 * d.ratioH,
    width: 70 * d.ratioW,
  },
  viewCustomItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  butonCustomItem: {
    paddingLeft: 10 * d.ratioH,
  },
  viewStarRating: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45 * d.ratioH,
  },
  viewCustom: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.054,
  },
  viewButton: {
    borderRadius: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 265 * d.ratioW,
    height: 50 * d.ratioH,
    backgroundColor: Colors.default,
  },
  viewOption: {
    paddingBottom: 30 * d.ratioH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItemOption: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.default,
    width: 50 * d.ratioW,
    height: 50 * d.ratioH,
  },
  viewItemImages: {
    paddingTop: 30 * d.ratioH,
    width: 265 * d.ratioW,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 100 * d.ratioH,
  },
  viewItemImagesList: {},
  viewMenuItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewImageSelectedItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewHeadModal: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.default,
    alignItems: 'center',
    height: 64 * d.ratioH,
  },
  viewFormRatingItem: {
    height: 10 * d.ratioH,
  },
  viewFormRating: {
    // height: 500 * d.ratioH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textviewButtonDone: {
    color: Colors.white,
    fontWeight: '700',
  },
  viewButtonDone: {
    backgroundColor: Colors.default,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50 * d.ratioH,
    width: 340 * d.ratioW,
  },
  textHeadModal: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  textUserName: {
    color: 'rgb(19,19,19)',
    fontSize: 14,
    fontWeight: '700',
  },
  bodyModal: {
    alignItems: 'center',
  },
  viewFormPhoto: {
    backgroundColor: 'red',
    width: 450 * d.ratioW,
    flexDirection: 'row',
  },
});

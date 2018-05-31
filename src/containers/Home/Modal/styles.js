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
  ViewButtonSearch: {
    padding: 3,
  },
  textPosted: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
  textPost: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textOpacity,
  },
  textCreatePost: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  textButtonPost: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  textAddPost: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  viewTextInputSearch: {
    paddingBottom: 10 * d.ratioH,
  },
  ViewContentFlatList: {
    height: 350 * d.ratioH,
    padding: 34,
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
    width: 340 * d.ratioW,
    height: 50 * d.ratioH,
    fontSize: 20,
    fontWeight: '700',
  },
  textInputSearch: {
    padding: 0,
    paddingLeft: 10,
    borderRadius: 2.5,
    width: 265 * d.ratioW,
    height: 30 * d.ratioH,
    borderBottomColor: Colors.textOpacity,
    borderBottomWidth: 0.3,
  },
  viewImage: {
    // backgroundColor: '#990',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewFormImageUser: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#444',
    height: 50 * d.ratioH,
    width: 50 * d.ratioW,
    borderRadius: 25,
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
    height: 93.7 * d.ratioH,
    width: 93.7 * d.ratioW,
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
    height: 45 * d.ratioH,
  },
  viewCustom: {
    padding: 14,
    backgroundColor: Colors.default,
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
    backgroundColor: Colors.default,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60 * d.ratioH,
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
    borderRadius: 30,
    backgroundColor: Colors.default,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50 * d.ratioH,
    width: 250 * d.ratioW,
  },
  textHeadModal: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  bodyModal: {
    alignItems: 'center',
  },
});

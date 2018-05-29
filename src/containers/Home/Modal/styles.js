import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../themes';
import * as d from '../../../utilities/Tranform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewHead: {
    padding: 14,
    backgroundColor: Colors.default,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewContent: {
    flex: 1,
  },
  imgClose: {
    // width: 20,
    // height: 20,
  },
  textPost: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
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
  viewImageSelected: {
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
    width: 265 * d.ratioW,
    height: 50 * d.ratioH,
    borderBottomColor: Colors.textOpacity,
    borderBottomWidth: 0.3,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    height: 550 * d.ratioH,
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
    backgroundColor: Colors.default,
    padding: 14,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60 * d.ratioH,
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

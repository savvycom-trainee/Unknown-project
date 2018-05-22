import { StyleSheet } from 'react-native';

import * as d from '../../../../utilities/Tranform';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10 * d.ratioH,
    marginBottom: 10 * d.ratioH,
    marginLeft: 25 * d.ratioW,
    marginRight: 25 * d.ratioW,
    borderRadius: 5 * d.ratioW,

    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  ViewMainChild: {
    padding: 26 * d.ratioW,
  },
  ViewMainChildTop: {
    flexDirection: 'row',
  },

  ViewMainChildBottom: {
    marginTop: 5 * d.ratioH,
  },

  ViewGallery: {
    flexDirection: 'row',
    marginTop: 5 * d.ratioH,
    justifyContent: 'space-between',
  },

  linkImage: {
    height: 30 * d.ratioH,
    width: 30 * d.ratioW,
  },
  ViewAvatar: {
    flex: 1,
  },
  avatar: {
    height: 35 * d.ratioH,
    width: 35 * d.ratioW,
    borderRadius: 35 * d.ratioW,
  },

  ViewNameHours: {
    flex: 5,
    marginLeft: 10 * d.ratioW,
  },
  ViewScore: {
    flex: 1.3,
  },

  TextName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
  },

  TextScore: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(66,183,42)',
  },

  TextHoursComment: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'rgb(153,153,153)',
  },
});

export default styles;

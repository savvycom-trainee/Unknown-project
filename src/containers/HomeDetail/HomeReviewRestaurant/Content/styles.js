import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 5,

    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  ViewMainChild: {
    padding: 26,
  },
  ViewMainChildTop: {
    flexDirection: 'row',
  },

  ViewMainChildBottom: {
    marginTop: 5,
  },

  ViewGallery: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },

  linkImage: {
    height: 30,
    width: 30,
  },
  ViewAvatar: {
    flex: 1,
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },

  ViewNameHours: {
    flex: 5,
    marginLeft: 10,
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

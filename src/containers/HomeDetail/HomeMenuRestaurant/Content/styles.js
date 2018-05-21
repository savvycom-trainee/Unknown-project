import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    height: 110,
    width: 315,

    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  ViewImg: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  Img: {
    height: 110,
    width: 110,
  },

  ViewContent: {
    flex: 1.7,
    flexDirection: 'column',
    marginLeft: 26,
    marginRight: 23,
    marginTop: 23,
    marginBottom: 23,
    // backgroundColor: 'red',
  },

  ViewTitleCost: {
    flexDirection: 'row',
    flex: 1,
  },

  ViewDescription: {
    flex: 1,

    marginTop: 10,
  },

  ViewTitle: {
    flex: 3.2,
  },

  ViewCost: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },

  TextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
  },

  TextCost: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgb(66,183,42)',
  },
  TextDescription: {
    fontSize: 9,
    fontWeight: 'normal',
    color: 'rgb(153,153,153)',
  },
});

export default styles;

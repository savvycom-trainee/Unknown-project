import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  ViewHeader: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconBack: {
    // marginTop: 30,
    marginLeft: 30,
    height: 13,
    width: 20,
  },
  Title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  IconSearch: {
    marginRight: 30,
    height: 17.5,
    width: 17.5,
  },
  ViewBtnAdd: {
    marginLeft: 295,
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: 'rgb(66,183,42)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnAdd: {
    fontSize: 17,
    color: 'white',
    // fontWeight: 'bold',
  },

  ViewContent: {
    flex: 1,
  },
});

export default styles;

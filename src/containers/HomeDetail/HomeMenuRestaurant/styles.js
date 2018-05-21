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
  ViewContent: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default styles;

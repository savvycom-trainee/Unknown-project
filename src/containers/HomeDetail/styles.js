import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'column',
  },

  ViewContent: {
    flex: 7,
    marginBottom: 0,
  },
  ViewTabbar: {
    // flex: 1,
    flexDirection: 'row',
    height: 55,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 100,

    justifyContent: 'center',
    backgroundColor: 'white',
  },

  TabbarFocus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(66,183,42,1)',
  },
  TextFocus: {
    fontSize: 12,
    color: 'rgba(66,183,42,1)',
    // fontSize: 12,

    fontWeight: 'bold',
  },

  TabbarNotFocus: {
    flex: 1,
    // borderTopWidth: 0.13,
    // borderTopColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextNotFocus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;

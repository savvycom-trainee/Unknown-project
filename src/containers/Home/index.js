import React, { PureComponent } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

class Home extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  };

  state = {};
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('HomeDetail');
          }}
          title="HomeDetailStack"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
// Home.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Home;

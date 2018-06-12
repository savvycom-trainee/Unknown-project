import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Header } from '../../components';
import { Icons } from '../../themes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { fetchDatagetPin } from '../../actions/getPinAction';
import restaurantData from './PinView/data/restaurantData';
import PinView from './PinView';
import styles from './styles';

class Pin extends PureComponent {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header centerHeader={<Text style={styles.centerHeaderStyle}>Bookmark</Text>} />
        <FlatList
          data={restaurantData}
          renderItem={({ item, index }) => (
            <PinView
              item={item}
              index={index}
              onPress={() => {
                this.props.navigation.navigate('HomeDetail');
              }}
              onDirectPress={() => {
                this.props.navigation.navigate('Direct');
              }}
            />
          )}
          keyExtractor={item => item.restaurantName.toString()}
        />
      </View>
    );
  }
}
Pin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  // onPressGoBack: PropTypes.func.isRequired,
  // data: PropTypes.object.isRequired,
  // idRestaurant: PropTypes.string,
  // fetchDatagetReview: PropTypes.func.isRequired,
  // dataReview: PropTypes.object.isRequired,
};

// Pin.defaultProps = {
//   onPressGoBack: () => {},
//   // idRestaurant: 'ChIJLYWpJUyrNTERuJo57taGljo',
// };
export default Pin;
// const mapStateToProps = state => ({
//   dataPin: state.getPinReducers,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchDatagetPin: id => dispatch(fetchDatagetPin(id)),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Pin);

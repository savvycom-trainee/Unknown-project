import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { View, Text, FlatList, AsyncStorage } from 'react-native';
import { fetchDatagetListBookmark } from '../../actions/getListBookmarkAction';
import Loading from '../../components/LoadingContainer';
import { Header } from '../../components';
import { Icons } from '../../themes';
// import restaurantData from './PinView/data/restaurantData';
import PinView from './PinView';
import styles from './styles';

class Pin extends PureComponent {
  state = {};
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).uid;
    console.log(userId);
    this.props.fetchDatagetListBookmark(userId);
  };

  renderCatchNothing = (data) => {
    if (data == null) {
      return <Text>You dont have Bookmark</Text>;
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <PinView
            item={item}
            index={index}
            onPress={() => {
              this.props.navigation.navigate('HomeDetail', { data: item.key });
            }}
            navigate={this.props.navigation.navigate}
          />
        )}
        // keyExtractor={item => item.restaurantName.toString()}
      />
    );
  };
  render() {
    if (this.props.dataListBookmark.isFetching === true) {
      return <Loading />;
    }
    const data = this.props.dataListBookmark.data;
    console.log(this.props.dataListBookmark);

    return (
      <View style={{ flex: 1 }}>
        <Header centerHeader={<Text style={styles.centerHeaderStyle}>Bookmark</Text>} />

        {this.renderCatchNothing(data)}
      </View>
    );
  }
}

// export default Pin;
Pin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    // getParam: PropTypes.func.isRequired,
    // goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchDatagetListBookmark: PropTypes.func.isRequired,
  dataListBookmark: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dataListBookmark: state.getListBookmarkReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetListBookmark: id => dispatch(fetchDatagetListBookmark(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pin);

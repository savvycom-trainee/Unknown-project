import React, { Component } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { Icons } from '../../themes';
// import * as d from '../../utilities/Tranform';
import FindCard from './FindCard';
import { setUserDatabase } from '../../actions';

// import styles from './styles';

class FindAround extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this._getUserAround();
  }

  _getUserAround = () => {
    const { user } = this.props.user;
    firebase
      .database()
      .ref('/restaurant/user/')
      .once('value')
      .then((snapshot) => {
        const data = [];
        // eslint-disable-next-line
        for (let i = 0; i < snapshot._childKeys.length; i++) {
          const uid = snapshot._childKeys[i];
          const userItem = snapshot.val()[uid];
          if (uid === user.uid) {
            console.log(userItem);
            this.props.setUser(userItem);
          } else if (userItem.location && userItem.location.lat && userItem.location.lng) {
            // console.log(userItem);
            /*eslint-disable */
            const distance = this._getDistanceFromLatLonInKm(
              userItem.location.lat,
              userItem.location.lng,
              user.location.lat,
              user.location.lng,
            );
            userItem.uid = uid;
            userItem.distance = distance;
            userItem.isFollow = userItem.follower ? userItem.follower.indexOf(uid) !== -1 : false;
            // console.log(userItem);
            /* eslint-enable */
            if (distance < 1000) {
              data.push(userItem);
            }
          }
        }
        return data;
      })
      .then(data => this.setState({ data }))
      .catch(err => console.log('getUserAround', err));
  };
  deg2rad = deg => deg * (Math.PI / 180);
  /*eslint-disable */
  _getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d);
    /* eslint-enable */
  };

  // TODO navigate to user detail
  _renderItem = ({ item, index }) => <FindCard item={item} index={index} />;
  render() {
    const { data } = this.state;
    console.log(data.length);

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.back} style={{ width: 30 }} />}
          onPressLeftHeader={() => this.props.navigation.goBack()}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Find Around</Text>}
          rightHeader={<Image source={Icons.user} />}
        />
        {data.length === 0 && (
          <ActivityIndicator size={30} color="#000" style={{ alignSelf: 'center' }} />
        )}
        <FlatList
          style={{ flex: 1 }}
          data={data}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
FindAround.propTypes = {
  navigation: PropTypes.object, // eslint-disable-line
  user: PropTypes.object, // eslint-disable-line
  setUser: PropTypes.func, //eslint-disable-line
};
const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUserDatabase(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FindAround);

import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import styles from './styles';
import { Images, Colors } from '../../../themes';
import { setUser } from '../../../actions';

class FindCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.user = this.props.user;
  }
  state = {
    isFollow: this.props.item.isFollow,
  };

  componentDidUpdate() {}
  setFollow = (follow) => {
    this.setState({ isFollow: follow });
  };
  _onPress = () => {
    console.log('_onPress');
    const { isFollow } = this.state;
    const { item, user } = this;

    if (!isFollow) {
      const updates = {};
      item.follower = item.follower || [];
      user.following = user.following || [];
      updates[`/root/users/${item.uid}/follower`] = [...item.follower, user.uid];
      item.follower = [...item.follower, user.uid];
      updates[`/root/users/${user.uid}/following`] = [...user.following, item.uid];

      user.following = [...user.following, item.uid];
      this.props.setUser(user);
      firebase
        .database()
        .ref()
        .update(updates);
    } else {
      const updates = {};
      const index = item.follower ? item.follower.indexOf(user.uid) : -1;
      if (index !== -1) item.follower.splice(index, 1);
      updates[`/root/users/${item.uid}/follower`] = item.follower ? [...item.follower] : [];
      const index1 = user.following ? user.following.indexOf(item.uid) : -1;
      if (index1 !== -1) user.following.splice(index1, 1);
      updates[`/root/users/${user.uid}/following`] = user.following ? [...user.following] : [];
      this.props.setUser(user);
      firebase
        .database()
        .ref()
        .update(updates);
    }
    this.setState({ isFollow: !this.state.isFollow });
  };
  _onAccountPress = () => {
    // eslint-disable-next-line
    this.props.navigation.navigate('Account', {
      idUser: this.item.uid,
      setFollow: this.setFollow,
    });
  };
  render() {
    const { isFollow } = this.state;
    const { item, index } = this.props;
    return (
      <View style={[styles.item, { marginTop: index === 0 ? 15 : 10 }]}>
        <TouchableOpacity onPress={this._onAccountPress}>
          <View style={styles.content_layout}>
            <Image
              source={item.photoURL ? { uri: item.photoURL } : Images.defaultAvatar}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {item.fullName}
              </Text>
              <View style={styles.item_layout}>
                <Icon
                  name={item.gender === 'Male' ? 'md-male' : 'md-female'}
                  color={item.gender === 'Male' ? '#42bcf4' : '#ff82d5'}
                  size={18}
                  // style={{ margin: 5 }}
                />
                <Text> {item.gender === 'Male' ? 'Nam' : 'Nữ'}</Text>
              </View>
              {item.distance ? (
                <View style={styles.item_layout}>
                  <Icon
                    name="ios-compass-outline"
                    color={Colors.default}
                    size={18}
                    // style={{ margin: 5 }}
                  />
                  <Text> {item.distance} km</Text>
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._onPress}
          style={[styles.button, { backgroundColor: !isFollow ? Colors.default : '#42bcf9' }]}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 9,
              padding: 6,
              fontWeight: '400',
            }}
          >
            {!isFollow ? '+ Follow' : '√ Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
FindCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.object, //eslint-disable-line
  setUser: PropTypes.func, //eslint-disable-line
  refresh: PropTypes.func, //eslint-disable-line
};
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
});
const mapStateToProps = state => ({
  user: state.user.userDatabase,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindCard);

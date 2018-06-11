import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import styles from './styles';
import { Images } from '../../../themes';
import * as d from '../../../utilities/Tranform';

class FindCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.user = this.props.user;
  }
  state = {
    isFollow: this.props.item.isFollow,
  };
  componentDidMount() {
    console.log(this.props.item);
  }
  componentDidUpdate() {
    const { isFollow } = this.state;
    const { item, user } = this;
    console.log(user);

    if (isFollow) {
      const updates = {};
      item.follower = item.follower || [];
      user.followed = user.followed || [];
      updates[`/root/users/${item.uid}/follower`] = [...item.follower, user.uid];
      this.item.follower = [...item.follower, user.uid];
      updates[`/root/users/${user.uid}/following`] = [...user.followed, item.uid];
      this.user.followed = [...user.followed, item.uid];
      firebase
        .database()
        .ref()
        .update(updates);
    } else {
      const updates = {};
      const index = item.follower ? item.follower.indexOf(user.uid) : -1;
      if (index !== -1) item.follower.splice(index, 1);
      updates[`/root/users/${item.uid}/follower`] = item.follower ? [...item.follower] : [];
      const index1 = user.followed ? user.followed.indexOf(item.uid) : -1;
      if (index1 !== -1) user.followed.splice(index1, 1);
      updates[`/root/users/${user.uid}/following`] = user.followed ? [...user.followed] : [];
      firebase
        .database()
        .ref()
        .update(updates);
    }
  }
  _onPress = () => this.setState({ isFollow: !this.state.isFollow });
  render() {
    const { isFollow } = this.state;
    const { item, index } = this.props;
    return (
      <TouchableOpacity style={[styles.item, { marginTop: index === 0 ? 15 : 10 }]}>
        <View style={styles.content_layout}>
          <Image
            source={item.photoURL ? { uri: item.photoURL } : Images.avatar}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.name}>{item.fullName}</Text>
            <View style={styles.item_layout}>
              <Icon
                name={item.gender === 'Male' ? 'md-male' : 'md-female'}
                color={item.gender === 'Male' ? '#42bcf4' : '#ff82d5'}
                size={15}
                style={{ margin: 5 }}
              />
              <Text>{item.gender === 'Male' ? 'Nam' : 'Nữ'}</Text>
            </View>
            <View style={styles.item_layout}>
              <Icon name="ios-compass-outline" color="green" size={18} style={{ margin: 5 }} />
              <Text> {item.distance} km</Text>
            </View>
          </View>
          <View style={{ width: 80 * d.ratioH }}>
            <TouchableOpacity
              onPress={this._onPress}
              style={[styles.button, { borderColor: !isFollow ? 'green' : 'blue' }]}
            >
              <Text style={{ color: !isFollow ? 'green' : 'blue', fontSize: 7, margin: 5 }}>
                {!isFollow ? '+ FOLLOW' : '√ FOLLOW'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
FindCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.object, //eslint-disable-line
};
const mapStateToProps = state => ({
  user: state.user.userDatabase,
});
export default connect(mapStateToProps)(FindCard);

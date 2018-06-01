import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import styles from './styles';
import { Images } from '../../../themes';

class FindCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.item = this.props.item;
  }
  state = {
    isFollow: this.props.item.isFollow,
  };
  componentDidMount() {
    console.log(this.props.item);
  }
  componentDidUpdate() {
    const { isFollow } = this.state;
    const { item } = this;
    const { user } = this.props;
    console.log(user);

    // if (isFollow) {
    //   const updates = {};
    //   if (item.follower) {
    //     this.props.item.follower = [...item.follower, user.uid];
    //     updates[`/restaurant/user/${item.uid}/folower`] = [...item.follower, user.uid];
    //   } else {
    //     firebase
    //       .database()
    //       .ref(`/restaurant/user/${item.uid}`)
    //       .set({
    //         follower: [user.id],
    //       });
    //   }
    //   updates[`/restaurant/user/${user.uid}/followed`] = [...user.followed, item.uid];
    //   firebase
    //     .database()
    //     .ref()
    //     .update(updates);
    // } else {
    //   const updates = {};
    //   const index = item.follower.indexOf(user.uid);
    //   item.follower.splice(index, 1);
    //   updates[`/restaurant/user/${item.uid}/follower`] = [...item.follower];
    //   const index1 = user.followed.indexOf(item.uid);
    //   user.followed.splice(index1, 1);
    //   updates[`/restaurant/user/${user.uid}/followed`] = [...user.followed];
    //   console.log(updates);

    //   firebase
    //     .database()
    //     .ref()
    //     .update(updates);
    // }
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
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{item.name}</Text>
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
              <Icon name="ios-compass-outline" size={15} style={{ margin: 5 }} />
              <Text> {item.distance} km</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
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
  user: state.user,
});
export default connect(mapStateToProps)(FindCard);

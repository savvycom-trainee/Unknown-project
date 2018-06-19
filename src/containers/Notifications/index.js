import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import EmptyContent from '../../components/EmptyContent';
// import { Icons } from '../../themes';
// import * as d from '../../utilities/Tranform';
import Content from './Content';
import styles from './styles';
import Data from './Data';

class Notifications extends PureComponent {
  // componentDidMount(){
  //   this.props.
  // }
  state = {};

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props !== nextProps) {
      this.props.navigation.setParams({ badge: true });
    }
  }
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Notification</Text>}
          rightHeader={
            <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
              <Icon name="ios-person-add" style={{ marginTop: -18 }} size={30} color="#000" />
            </TouchableOpacity>
          }
        />
        <EmptyContent />
        {/* <FlatList
          data={Data}
          renderItem={({ item }) => <Content data={item} />}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </View>
    );
  }
}
Notifications.propTypes = {
  navigation: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  badge: state.badge,
});
export default connect(mapStateToProps)(Notifications);

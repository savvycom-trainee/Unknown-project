import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, AsyncStorage } from 'react-native';
// import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDatagetHomeDetail } from '../../actions/getHomeDetailAction';
import { fetchDatagetUserDetail } from '../../actions/getUserDetailAction';

import styles from './styles';

import HomeOverviewRestaurant from './HomeOverviewRestaurant';
import HomeMenuRestaurant from './HomeMenuRestaurant';
import HomeReviewRestaurant from './HomeReviewRestaurant';

class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'HomeOverviewRestaurant',
      isOverviewClick: true,
      isMenuClick: false,
      isReviewClick: false,
      idRestaurant: this.props.navigation.getParam('data', null),
      userId: '',
      // data: this.props.navigation.getParam('data', null),
    };
  }

  componentDidMount() {
    console.log('get data');
    this.fetchData(this.state.idRestaurant);
    console.log('user data');
    // this.fetchDataUser(this.getUser());
    this.getUser();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      // console.log(JSON.parse(user));

      const tmpUser = JSON.parse(user);
      console.log('get asyn data');
      console.log(tmpUser.uid);
      this.setState({
        userId: tmpUser.uid,
      });
      this.fetchDataUser(tmpUser.uid);
    } catch (error) {
      console.log(error);
    }
  };

  handleBackPress = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  fetchDataUser = (id) => {
    this.props.fetchDatagetUserDetail(id);
  };

  fetchData = (id) => {
    this.props.fetchDatagetHomeDetail(id);
  };

  clickTab1 = () => {
    this.setState({
      activeTab: 'HomeOverviewRestaurant',
      isOverviewClick: true,
      isMenuClick: false,
      isReviewClick: false,
    });
  };
  clickTab2 = () => {
    this.setState({
      activeTab: 'HomeMenuRestaurant',
      isOverviewClick: false,
      isMenuClick: true,
      isReviewClick: false,
    });
  };
  clickTab3 = () => {
    this.setState({
      activeTab: 'HomeReviewRestaurant',
      isOverviewClick: false,
      isMenuClick: false,
      isReviewClick: true,
    });
  };

  render() {
    console.log('ren');
    // console.log(this.props.dataHomeDetail.data);
    console.log(this.props.dataUserDetail.data);
    const Content = (activeTab) => {
      if (activeTab === 'HomeOverviewRestaurant') {
        return (
          <HomeOverviewRestaurant
            idRestaurant={this.state.idRestaurant}
            data={this.props.dataHomeDetail.data}
            onPressGoBack={() => this.props.navigation.goBack()}
            onPressDirect={() => this.props.navigation.navigate('Direct')}
          />
        );
      } else if (activeTab === 'HomeMenuRestaurant') {
        return (
          <HomeMenuRestaurant
            idRestaurant={this.state.idRestaurant}
            data={this.props.dataHomeDetail.data}
            onPressGoBack={() => this.props.navigation.goBack()}
          />
        );
      }
      return (
        <HomeReviewRestaurant
          // onPressRefesh={() => this.fetchData(this.state.idRestaurant)}
          userId={this.state.userId}
          userName={this.props.dataUserDetail.data.name}
          userAvatarUrl={this.props.dataUserDetail.data.photoURL}
          idRestaurant={this.state.idRestaurant}
          data={this.props.dataHomeDetail.data}
          onPressGoBack={() => this.props.navigation.goBack()}
        />
      );
    };

    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewContent}>{Content(this.state.activeTab)}</View>
        <View style={styles.ViewTabbar}>
          <TouchableOpacity
            onPress={() => this.clickTab1()}
            style={this.state.isOverviewClick ? styles.TabbarFocus : styles.TabbarNotFocus}
          >
            <Text style={this.state.isOverviewClick ? styles.TextFocus : styles.TextNotFocus}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.clickTab2()}
            style={this.state.isMenuClick ? styles.TabbarFocus : styles.TabbarNotFocus}
          >
            <Text style={this.state.isMenuClick ? styles.TextFocus : styles.TextNotFocus}>
              Menu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.clickTab3()}
            style={this.state.isReviewClick ? styles.TabbarFocus : styles.TabbarNotFocus}
          >
            <Text style={this.state.isReviewClick ? styles.TextFocus : styles.TextNotFocus}>
              Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchDatagetHomeDetail: PropTypes.func.isRequired,
  dataHomeDetail: PropTypes.object.isRequired,

  fetchDatagetUserDetail: PropTypes.func.isRequired,
  dataUserDetail: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dataHomeDetail: state.getHomeDetailReducers,
  dataUserDetail: state.getUserDetailReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetHomeDetail: id => dispatch(fetchDatagetHomeDetail(id)),
  fetchDatagetUserDetail: userId => dispatch(fetchDatagetUserDetail(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeDetail);

// export default HomeDetail;

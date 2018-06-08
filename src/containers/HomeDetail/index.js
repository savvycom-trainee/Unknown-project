import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
// import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchDatagetHomeDetail } from '../../actions/getHomeDetailAction';

import styles from './styles';

import HomeOverviewRestaurant from './HomeOverviewRestaurant';
// import HomeMenuRestaurant from './HomeMenuRestaurant';
import HomeReviewRestaurant from './HomeReviewRestaurant';

class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'HomeOverviewRestaurant',
      isOverviewClick: true,
      // isMenuClick: false,
      isReviewClick: false,
      idRestaurant: this.props.navigation.getParam('data', 'ChIJu47wL4yrNTERXSmPBD0JC2M'),
      // data: this.props.navigation.getParam('data', null),
    };
  }

  componentDidMount() {
    // this.fetchData(this.state.idRestaurant);
    console.log(this.state.idRestaurant);
    console.log('didmount');
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  // fetchData = (id) => {
  //   this.props.fetchDatagetHomeDetail(id);
  // };

  clickTab1 = () => {
    this.setState({
      activeTab: 'HomeOverviewRestaurant',
      isOverviewClick: true,
      // isMenuClick: false,
      isReviewClick: false,
    });
  };
  // clickTab2 = () => {
  //   this.setState({
  //     activeTab: 'HomeMenuRestaurant',
  //     isOverviewClick: false,
  //     isMenuClick: true,
  //     isReviewClick: false,
  //   });
  // };
  clickTab3 = () => {
    this.setState({
      activeTab: 'HomeReviewRestaurant',
      isOverviewClick: false,
      // isMenuClick: false,
      isReviewClick: true,
    });
  };

  render() {
    const Content = (activeTab) => {
      if (activeTab === 'HomeOverviewRestaurant') {
        return (
          <HomeOverviewRestaurant
            idRestaurant={this.state.idRestaurant}
            onPressGoBack={() => this.props.navigation.goBack()}
            onPressDirect={() => this.props.navigation.navigate('Direct')}
          />
        );
      }

      return (
        <HomeReviewRestaurant
          idRestaurant={this.state.idRestaurant}
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
          {/* <TouchableOpacity
            onPress={() => this.clickTab2()}
            style={this.state.isMenuClick ? styles.TabbarFocus : styles.TabbarNotFocus}
          >
            <Text style={this.state.isMenuClick ? styles.TextFocus : styles.TextNotFocus}>
              Menu
            </Text>
          </TouchableOpacity> */}
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
  // fetchDatagetHomeDetail: PropTypes.func.isRequired,
  // dataHomeDetail: PropTypes.object.isRequired,
};

// const mapStateToProps = state => ({
//   dataHomeDetail: state.getHomeDetailReducers,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchDatagetHomeDetail: id => dispatch(fetchDatagetHomeDetail(id)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(HomeDetail);
export default HomeDetail;

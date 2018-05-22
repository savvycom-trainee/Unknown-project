import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Button } from 'react-native';
import styles from './styles';
/* eslint-disable */

import HomeOverviewRestaurant from './HomeOverviewRestaurant';
import HomeMenuRestaurant from './HomeMenuRestaurant';
import HomeReviewRestaurant from './HomeReviewRestaurant';

class HomeDetail extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  state = {
    activeTab: 'HomeOverviewRestaurant',
    isOverviewClick: true,
    isMenuClick: false,
    isReviewClick: false,
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack(null);
    return true;
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
    const Content = activeTab => {
      if (activeTab === 'HomeOverviewRestaurant') {
        return (
          <HomeOverviewRestaurant
            onPressGoBack={() => this.props.navigation.goBack()}
            onPressDirect={() => this.props.navigation.navigate('Direct')}
          />
        );
      } else if (activeTab === 'HomeMenuRestaurant') {
        return <HomeMenuRestaurant onPressGoBack={() => this.props.navigation.goBack()} />;
      }
      return <HomeReviewRestaurant onPressGoBack={() => this.props.navigation.goBack()} />;
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

export default HomeDetail;

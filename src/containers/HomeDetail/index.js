import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

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

  clickTab1 = () => {
    this.setState({
      activeTab: 'HomeOverviewRestaurant',
      isOverviewClick: true,
      isMenuClick: false,
      isReviewClick: false,
    });
    // console.log('overview');
  };
  clickTab2 = () => {
    this.setState({
      activeTab: 'HomeMenuRestaurant',
      isOverviewClick: false,
      isMenuClick: true,
      isReviewClick: false,
    });
    // console.log('menu');
  };
  clickTab3 = () => {
    this.setState({
      activeTab: 'HomeReviewRestaurant',
      isOverviewClick: false,
      isMenuClick: false,
      isReviewClick: true,
    });
    // console.log('review');
  };

  render() {
    const Content = (activeTab) => {
      if (activeTab === 'HomeOverviewRestaurant') {
        return <HomeOverviewRestaurant />;
      } else if (activeTab === 'HomeMenuRestaurant') {
        return <HomeMenuRestaurant />;
      }
      return <HomeReviewRestaurant />;
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

import React, { PureComponent } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { View, Text, Image, FlatList } from 'react-native';
import { Icons, Colors } from '../../../themes';
import Header from '../../../components/Header';
import ButtonCustom from './ButtonCustom';
import * as d from '../../../utilities/Tranform';

import styles from './styles';
/* eslint-disable */
class HomeOverviewRestaurant extends PureComponent {
  state = {
    time: this.props.data.timeopen + '-' + this.props.data.timeclose,
    isBookmark: false,
  };
  onPressBookmark = () => {
    this.setState({
      isBookmark: !this.state.isBookmark,
    });
  };
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader
          rightHeader
        />
        <View style={styles.ScrollViewImages}>
          <FlatList
            horizontal={true}
            data={this.props.data.photos}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.ImagesOverView} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.ViewContent}>
          <View style={styles.ViewPointWrap}>
            <View style={styles.ViewPoint}>
              <Text style={styles.Point}>{this.props.data.rating}</Text>
            </View>
          </View>

          <View style={styles.ViewNameRestaurant}>
            <Text style={styles.TextNameRestaurant}>{this.props.data.name}</Text>
          </View>

          <View style={styles.ViewTypeRestaurantCost}>
            <View style={styles.ViewTypeRestaurant}>
              <Text style={styles.TextTypeRestaurant}>RESTAURANT</Text>
            </View>
            <View style={styles.ViewCost}>
              <StarRating
                disabled={false}
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                iconSet="Ionicons"
                maxStars={5}
                rating={this.props.data.rating}
                fullStarColor="#4CB33E"
                reversed
                starSize={12}
              />
            </View>
          </View>

          <View style={styles.ViewLocation}>
            <Text style={styles.TextStatus}>Open Now</Text>
            <Text style={styles.TextLocation}> • {this.props.data.vicinity}</Text>
          </View>

          <View style={styles.ViewLocation}>
            <Text style={styles.TextLocation}>{this.props.data.detail}</Text>
          </View>

          <View style={styles.ViewBtnBottom}>
            <ButtonCustom
              title={this.state.time}
              iconName={Icons.clockTime}
              iconColor={Colors.default}
            />
            <ButtonCustom
              title="Direct"
              iconName={Icons.directOutLine}
              iconColor={Colors.text}
              onPressButton={this.props.onPressDirect}
            />
            <ButtonCustom title="Call Now" iconName={Icons.phoneCall} iconColor={Colors.text} />
            <ButtonCustom
              title="Bookmarks"
              iconName={this.state.isBookmark ? Icons.pinFocused : Icons.pin}
              iconColor={this.state.isBookmark ? Colors.default : Colors.text}
              onPressButton={this.onPressBookmark}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeOverviewRestaurant;

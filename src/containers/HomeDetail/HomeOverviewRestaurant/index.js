import React, { PureComponent } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icons, Colors } from '../../../themes';
import Header from '../../../components/Header';
import ButtonCustom from './ButtonCustom';
import * as d from '../../../utilities/Tranform';

import styles from './styles';
/* eslint-disable */
class HomeOverviewRestaurant extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        {/* <View style={styles.ViewHeader}>
          <TouchableOpacity onPress={this.props.onPressGoBack}>
            <Image source={Icons.back} style={styles.IconBack} />
          </TouchableOpacity>
        </View> */}
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader
          rightHeader
        />
        <View style={styles.ScrollViewImages}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('./Data/images/1.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/2.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/1.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/2.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/1.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/1.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/2.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/1.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/2.png')} style={styles.ImagesOverView} />
            <Image source={require('./Data/images/1.png')} style={styles.ImagesOverView} />
          </ScrollView>
        </View>

        <View style={styles.ViewContent}>
          <View style={styles.ViewPointWrap}>
            <View style={styles.ViewPoint}>
              <Text style={styles.Point}>9.2</Text>
            </View>
          </View>

          <View style={styles.ViewNameRestaurant}>
            <Text style={styles.TextNameRestaurant}>Sublimotion</Text>
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
                maxStars={4}
                rating={3}
                fullStarColor="#4CB33E"
                reversed
                starSize={12}
              />
            </View>
          </View>

          <View style={styles.ViewLocation}>
            <Text style={styles.TextStatus}>Open Now</Text>
            <Text style={styles.TextLocation}> • Hanoi, Vietnam</Text>
          </View>

          <View style={styles.ViewLocation}>
            <Text style={styles.TextLocation}>
              Sublimotion is a restaurant located in Sant Josep de sa Talaia, Ibiza, Spain run by
              Michelin 2-star chef Paco Roncero who utilizes molecular gastronomy in cooking.
            </Text>
          </View>

          <View style={styles.ViewBtnBottom}>
            <ButtonCustom title="8am-10pm" iconName={Icons.clockTime} iconColor={Colors.default} />
            <ButtonCustom
              title="Direct"
              iconName={Icons.directOutLine}
              iconColor={Colors.text}
              onPressDirect1={this.props.onPressDirect}
            />
            <ButtonCustom title="Call Now" iconName={Icons.phoneCall} iconColor={Colors.text} />
            <ButtonCustom title="Bookmarks" iconName={Icons.pin} iconColor={Colors.text} />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeOverviewRestaurant;

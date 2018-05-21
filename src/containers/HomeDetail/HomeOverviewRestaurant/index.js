import React, { PureComponent } from 'react';
import StarRating from 'react-native-star-rating';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icons } from '../../../themes';

import styles from './styles';
/* eslint-disable */
class HomeOverviewRestaurant extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  };
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewHeader}>
          <TouchableOpacity>
            <Image source={Icons.back} style={styles.IconBack} />
          </TouchableOpacity>
        </View>
        <View style={styles.ScrollViewImages}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // scrollEventThrottle={10} // how often we update the position of the indicator bar
            // pagingEnabled // scrolls from one image to the next, instead of allowing any value inbetween
          >
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

          <View>
            <Text />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeOverviewRestaurant;

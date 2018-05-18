import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
// import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Icons, Images } from '../../themes';

const shadow = {
  shadowRadius: 2.5,
  shadowOpacity: 0.1,
  elevation: 1,
  shadowOffset: { width: 2, height: 1 },
};
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flow: true,
      // starCount: 2.5,
    };
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.viewMenu}>
              <View style={[styles.viewMenuItem, shadow]}>
                <View style={[styles.itemMenu]}>
                  <TouchableOpacity style={styles.itemMenuIcon}>
                    <Image source={Icons.add} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity style={styles.itemMenuIcon}>
                    <Image source={Icons.profile} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity style={styles.itemMenuIcon}>
                    <Image source={Icons.direct} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContent}>
              <View style={styles.viewContentForm}>
                <View style={styles.formItem}>
                  <View>
                    <Image source={Images.restaurantPhoto} />
                  </View>
                  <View style={styles.formItemText}>
                    <View style={styles.viewNameRow1}>
                      <Text style={styles.textName}>Sublimotion</Text>
                    </View>
                    <View style={styles.viewNameRow2}>
                      <View>
                        <Text style={styles.textNameRow2}>RESTAURANT</Text>
                      </View>
                      <View>
                        {/* <StarRating
                          disabled={false}
                          emptyStar="ios-star-outline"
                          fullStar="ios-star"
                          iconSet="Ionicons"
                          maxStars={4}
                          rating={this.state.starCount}
                          fullStarColor="#4CB33E"
                          reversed
                          starSize={12}
                        /> */}
                      </View>
                    </View>
                    <View style={styles.viewNameRow3}>
                      <View>
                        {this.state.flow ? (
                          <Text style={styles.textNameRow2Flowed}>Flowed</Text>
                        ) : (
                          <Text style={styles.textNameRow2}>Flow</Text>
                        )}
                      </View>
                      <View style={styles.viewNameRow2Item}>
                        <Text style={styles.textNameRow2}> • 400m from you</Text>
                      </View>
                      <View style={styles.viewNameRow2Item}>
                        <Text style={styles.textNameRow2}> • Hanoi, Vietnam</Text>
                      </View>
                    </View>
                    <View />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Button
          onPress={() => {
            this.props.navigation.navigate('HomeDetail');
          }}
          title="HomeDetailStack"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;

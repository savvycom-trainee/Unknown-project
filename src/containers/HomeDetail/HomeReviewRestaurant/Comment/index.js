import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import StarRating from 'react-native-star-rating';

import styles from './styles';

class Comment extends PureComponent {
  state = {
    textComment: '',
    starCount: 3,
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  confirmAddReview = (commentInput, ratingInput) => {
    try {
      firebase
        .database()
        .ref(`/restaurant/restaurant/${this.props.idRestaurant}/review`)
        .push({
          comment: commentInput,
          iduser: 'user123',
          // image: [
          //   'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
          //   'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
          // ],
          name: 'user123',
          rating: ratingInput,
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(`/restaurant/restaurant/${this.props.idRestaurant}/review`);

    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewMainChild}>
          <View style={styles.ViewMainChildTop}>
            <View style={styles.ViewAvatar}>
              <Image source={require('../Data/images/1.png')} style={styles.avatar} />
            </View>
            <View style={styles.ViewNameHours}>
              <Text style={styles.TextName}>name</Text>
              <Text style={styles.TextHoursComment}>12 hour</Text>
            </View>
            <View style={styles.ViewScore}>
              <StarRating
                disabled={false}
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                iconSet="Ionicons"
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={rating => this.onStarRatingPress(rating)}
                fullStarColor="#4CB33E"
                reversed
                starSize={12}
              />
            </View>
          </View>
          <View style={styles.ViewMainChildBottom}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 0.2,
                borderRadius: 3,
              }}
              underlineColorAndroid="white"
              placeholder="what do you think ?"
              onChangeText={text => this.setState({ textComment: text })}
              value={this.state.textComment}
            />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                this.confirmAddReview(this.state.textComment, this.state.starCount);
              }}
              // onPress={this.props.onPressConfirm(this.state.textComment, this.state.starCount)}
            >
              <Text style={styles.TextConfirm}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

Comment.propTypes = {
  onPressConfirm: PropTypes.func.isRequired,
};
export default Comment;

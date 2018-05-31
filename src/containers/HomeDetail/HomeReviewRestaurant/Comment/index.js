import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import StarRating from 'react-native-star-rating';

import styles from './styles';
import { rethrow } from 'rsvp';

class Comment extends PureComponent {
  state = {
    textComment: null,
    starCount: 3,
    YourReview: false,
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  confirmAddReview = (commentInput, ratingInput) => {
    if (commentInput != null) {
      try {
        firebase
          .database()
          .ref(`/restaurant/restaurant/${this.props.idRestaurant}/review`)
          .push({
            comment: commentInput,
            iduser: this.props.userId,
            rating: ratingInput,
          });
        this.addReview();
      } catch (error) {
        console.log(error);
      }
    }
  };

  addReview = () => {
    this.setState({
      YourReview: !this.state.YourReview,
    });
  };

  showComment = () => {
    if (this.state.YourReview) {
      return (
        <View style={styles.ViewMain}>
          <View style={styles.ViewMainChild}>
            <View style={styles.ViewMainChildTop}>
              <View style={styles.ViewAvatar}>
                <Image source={{ uri: this.props.userAvatarUrl }} style={styles.avatar} />
              </View>
              <View style={styles.ViewNameHours}>
                <Text style={styles.TextName}>{this.props.userName}</Text>
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
              >
                <Text style={styles.TextConfirm}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  render() {
    console.log(`/restaurant/restaurant/${this.props.idRestaurant}/review`);
    console.log(this.props.userName);

    return (
      <View>
        <TouchableOpacity style={styles.ViewBtnAdd} onPress={() => this.addReview()}>
          <Text style={styles.BtnAdd}>{this.state.YourReview ? 'x' : '+'}</Text>
        </TouchableOpacity>
        {this.showComment()}
      </View>
    );
  }
}

Comment.propTypes = {
  // onPressConfirm: PropTypes.func.isRequired,
};
export default Comment;

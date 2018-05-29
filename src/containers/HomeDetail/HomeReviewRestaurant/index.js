import React, { PureComponent } from 'react';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';

import Content from './Content';
import Header from '../../../components/Header';
import Comment from './Comment';

import * as d from '../../../utilities/Tranform';

class HomeReviewRestaurant extends PureComponent {
  state = {
    idRestaurant: this.props.idRestaurant,
    // data: [],
    // modalVisible: false,
    YourReview: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    console.log(this.props.data.review);
    const obj = this.props.data.review;
    const arr = Object.keys(obj).map(key => obj[key]);
    console.log(arr);
    return arr;
  };

  addReview = () => {
    this.setState({
      YourReview: !this.state.YourReview,
    });
  };
  // confirmAddReview = (commentInput, ratingInput) => {
  //   this.addReview();
  //   try {
  //     firebase
  //       .database()
  //       .ref(`/restaurant/restaurant/${this.props.idRestaurant}/review`)
  //       .push({
  //         comment: commentInput,
  //         iduser: 'user123',
  //         image: [
  //           'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
  //           'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
  //         ],
  //         name: 'user123',
  //         rating: ratingInput,
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  ShowComment = (visible) => {
    if (visible) {
      return (
        <View>
          <View style={styles.ViewTextYourComment}>
            <Text style={styles.Title}>Your Review</Text>
          </View>
          <Comment
            onPressConfirm={() => {
              // this.confirmAddReview(commentInput, ratingInput);
              this.addReview();
            }}
            idRestaurant={this.props.idRestaurant}
          />
          <View style={styles.ViewTextYourComment}>
            <Text style={styles.Title}>Other Review</Text>
          </View>
        </View>
      );
    }
    return null;
  };
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Review</Text>}
          rightHeader
        />

        <TouchableOpacity style={styles.ViewBtnAdd} onPress={() => this.addReview()}>
          <Text style={styles.BtnAdd}>{this.state.YourReview ? 'x' : '+'}</Text>
        </TouchableOpacity>

        <View style={styles.ViewContent}>
          {this.ShowComment(this.state.YourReview)}
          <FlatList
            data={this.getData()}
            renderItem={({ item }) => <Content data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
HomeReviewRestaurant.propTypes = {
  onPressGoBack: PropTypes.func,
  data: PropTypes.object.isRequired,
  // idRestaurant: PropTypes.string,
};

HomeReviewRestaurant.defaultProps = {
  onPressGoBack: () => {},
};

export default HomeReviewRestaurant;

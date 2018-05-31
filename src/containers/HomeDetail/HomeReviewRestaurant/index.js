import React, { PureComponent } from 'react';
// import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';

import Content from './Content';
import Header from '../../../components/Header';
import Comment from './Comment';

import * as d from '../../../utilities/Tranform';

class HomeReviewRestaurant extends PureComponent {
  state = {};

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // console.log(this.props.data.review);
    const obj = this.props.data.review;
    const arr = Object.keys(obj).map(key => obj[key]);
    // console.log(arr);
    return arr;
  };

  // addReview = () => {
  //   this.setState({
  //     YourReview: !this.state.YourReview,
  //   });
  // };

  ShowComment = () => (
    <View>
      <Comment
        userId={this.props.userId}
        userName={this.props.userName}
        userAvatarUrl={this.props.userAvatarUrl}
        // onPressConfirm={() => {
        //   // this.confirmAddReview(commentInput, ratingInput);
        //   this.addReview();
        // }}
        idRestaurant={this.props.idRestaurant}
      />
    </View>
  );
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Review</Text>}
          rightHeader
        />

        {/* <TouchableOpacity style={styles.ViewBtnAdd} onPress={() => this.addReview()}>
          <Text style={styles.BtnAdd}>{this.state.YourReview ? 'x' : '+'}</Text>
        </TouchableOpacity> */}

        <View style={styles.ViewContent}>
          {this.ShowComment(this.state.YourReview)}
          <View style={styles.ViewTextYourComment}>
            <Text style={styles.Title}>Other Review</Text>
          </View>
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

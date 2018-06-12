import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDatagetReview } from '../../../actions/getReviewAction';
import Loading from '../../../components/LoadingContainer';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';

import Content from './Content';
import Header from '../../../components/Header';
import Comment from './Comment';

import * as d from '../../../utilities/Tranform';

class HomeReviewRestaurant extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDatagetReview(this.props.idRestaurant);
  }

  render() {
    if (this.props.dataReview.isFetching === true) {
      return <Loading />;
    }
    const data = this.props.dataReview.data;
    console.log(data);

    return (
      <View style={styles.ViewMain}>
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Review</Text>}
          rightHeader
        />

        <View style={styles.ViewContent}>
          <FlatList
            data={data}
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
  // data: PropTypes.object.isRequired,
  idRestaurant: PropTypes.string,
  fetchDatagetReview: PropTypes.func.isRequired,
  dataReview: PropTypes.object.isRequired,
};

HomeReviewRestaurant.defaultProps = {
  onPressGoBack: () => {},
  idRestaurant: 'ChIJLYWpJUyrNTERuJo57taGljo',
};

const mapStateToProps = state => ({
  dataReview: state.getReviewReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetReview: id => dispatch(fetchDatagetReview(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeReviewRestaurant);

// export default HomeReviewRestaurant;

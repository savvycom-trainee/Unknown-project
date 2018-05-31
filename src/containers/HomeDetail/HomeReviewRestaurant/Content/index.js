import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import styles from './styles';
import { fetchDatagetUserDetail } from '../../../../actions/getUserDetailAction';

// import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {
    userName: 'anonymous',
    urlAvatar: null,
  };

  componentDidMount() {
    // console.log(`iduser review ${this.props.data.iduser}`);
    this.fetchDataUser(this.props.data.iduser);
  }

  fetchDataUser = (id) => {
    // console.log('start to fetch user data');
    firebase
      .database()
      .ref(`restaurant/user/${id}`)
      .on('value', (snapshot) => {
        console.log(snapshot.val().name);

        // const value = snapshot.val();
        // console.log(value);
        this.setState({
          userName: snapshot.val().name,
          urlAvatar: snapshot.val().photoURL,
        });
      });
  };

  gallery() {
    // console.log();
    if (this.props.data.hasOwnProperty('image')) {
      if (this.props.data.image.length <= 0) {
        return null;
      }
      return (
        <FlatList
          style={styles.ViewGallery}
          data={this.props.data.image}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.gallery} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return null;
  }

  render() {
    // console.log(this.props.dataUserDetail.data.fullname);

    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewMainChild}>
          <View style={styles.ViewMainChildTop}>
            <View style={styles.ViewAvatar}>
              <Image source={{ uri: this.state.urlAvatar }} style={styles.avatar} />
            </View>
            <View style={styles.ViewNameHours}>
              <Text style={styles.TextName}>{this.state.userName}</Text>
              <Text style={styles.TextHoursComment}>12 hour</Text>
            </View>
            <View style={styles.ViewScore}>
              <Text style={styles.TextScore}>{this.props.data.rating}/5</Text>
            </View>
          </View>
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment}>{this.props.data.comment}</Text>
          </View>
          {this.gallery()}
        </View>
      </View>
    );
  }
}
// Content.propTypes = {
//   // navigation: PropTypes.shape({
//   //   navigate: PropTypes.func.isRequired,
//   //   getParam: PropTypes.func.isRequired,
//   //   goBack: PropTypes.func.isRequired,
//   // }).isRequired,
//   // fetchDatagetHomeDetail: PropTypes.func.isRequired,
//   // dataHomeDetail: PropTypes.object.isRequired,
//   // data: PropTypes.object,
//   fetchDatagetUserDetail: PropTypes.func.isRequired,
//   dataUserDetail: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   // dataHomeDetail: state.getHomeDetailReducers,
//   dataUserDetail: state.getUserDetailReducers,
// });

// const mapDispatchToProps = dispatch => ({
//   // fetchDatagetHomeDetail: id => dispatch(fetchDatagetHomeDetail(id)),
//   fetchDatagetUserDetail: userId => dispatch(fetchDatagetUserDetail(userId)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Content);

export default Content;

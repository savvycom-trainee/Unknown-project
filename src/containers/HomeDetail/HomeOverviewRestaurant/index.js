import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { fetchDatagetPlaceDetail } from '../../../actions/getPlaceDetailAction';
import Loading from '../../../components/LoadingContainer';
import { Icons, Colors } from '../../../themes';
import Header from '../../../components/Header';
import ButtonCustom from './ButtonCustom';
import ButtonBookmark from './ButtonBookmark';
import * as d from '../../../utilities/Tranform';

import styles from './styles';

class HomeOverviewRestaurant extends PureComponent {
  state = {
    idRestaurant: this.props.idRestaurant,
  };
  componentDidMount() {
    console.log(this.state.idRestaurant);
    this.fetchData(this.state.idRestaurant);
  }

  fetchData = (id) => {
    this.props.fetchDatagetPlaceDetail(id);
    console.log(this.props.dataPlaceDetail.data);
  };

  renderPhotos = (data) => {
    if (data.hasOwnProperty('photos')) {
      return (
        <View style={styles.ScrollViewImages}>
          <FlatList
            horizontal
            data={this.props.dataPlaceDetail.data.photos}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                    item.photo_reference
                  }&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk`,
                }}
                style={styles.ImagesOverView}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
    return (
      <View style={styles.ScrollViewImages}>
        <Image
          source={require('../../../../assets/images/restaurantPhoto.png')}
          style={styles.ImagesOverView}
        />
      </View>
    );
  };

  renderGreencircle = (data) => {
    if (data.hasOwnProperty('rating')) {
      return (
        <View style={styles.ViewPointWrap}>
          <View style={styles.ViewPoint}>
            <Text style={styles.Point}>{this.props.dataPlaceDetail.data.rating}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  render() {
    if (this.props.dataPlaceDetail.isFetching === true) {
      return <Loading />;
    }
    // eslint-disable-next-line
    const data = this.props.dataPlaceDetail.data;
    console.log(this.props.dataPlaceDetail.data.hasOwnProperty('rating'));

    return (
      // <Loading />
      <View style={styles.ViewMain}>
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader
          rightHeader
        />
        {this.renderPhotos(this.props.dataPlaceDetail.data)}

        <View style={styles.ViewContent}>
          {/* <View style={styles.ViewPointWrap}>
            <View style={styles.ViewPoint}>
              <Text style={styles.Point}>{this.props.dataPlaceDetail.data.rating}</Text>
            </View>
          </View> */}
          {this.renderGreencircle(this.props.dataPlaceDetail.data)}

          <View style={styles.ViewNameRestaurant}>
            <Text style={styles.TextNameRestaurant}>{this.props.dataPlaceDetail.data.name}</Text>
          </View>

          <View style={styles.ViewTypeRestaurantCost}>
            {/* <View style={styles.ViewTypeRestaurant}>
              <Text style={styles.TextTypeRestaurant}>{data.city}</Text>
            </View> */}
            <View style={styles.ViewCost}>
              <StarRating
                disabled={false}
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                iconSet="Ionicons"
                maxStars={5}
                rating={Math.floor(this.props.dataPlaceDetail.data.rating)}
                fullStarColor="#4CB33E"
                reversed
                starSize={12}
              />
            </View>
          </View>

          <View style={styles.ViewLocation}>
            <Text style={styles.TextStatus}>Open Now</Text>
          </View>

          <View style={styles.ViewLocation}>
            <Text style={styles.TextLocation}>{this.props.dataPlaceDetail.data.vicinity}</Text>
          </View>

          <View style={styles.ViewBtnBottom}>
            <ButtonCustom
              title="8h00 - 22h00"
              iconName={Icons.clockTime}
              iconColor={Colors.default}
            />
            <ButtonCustom
              title="Direct"
              iconName={Icons.directOutLine}
              iconColor={Colors.text}
              onPressButton={() =>
                this.props.navigate('Direct', {
                  destination: {
                    latitude: this.props.dataPlaceDetail.data.location.lat,
                    longitude: this.props.dataPlaceDetail.data.location.lng,
                  },
                })
              }
            />
            <ButtonCustom title="Call Now" iconName={Icons.phoneCall} iconColor={Colors.text} />
            <ButtonBookmark idRestaurant={this.props.idRestaurant} />
          </View>
        </View>
      </View>
    );
  }
}

HomeOverviewRestaurant.propTypes = {
  // navigation: PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  //   getParam: PropTypes.func.isRequired,
  //   goBack: PropTypes.func.isRequired,
  // }).isRequired,
  idRestaurant: PropTypes.string.isRequired,
  fetchDatagetPlaceDetail: PropTypes.func.isRequired,
  dataPlaceDetail: PropTypes.object.isRequired,
  onPressGoBack: PropTypes.func.isRequired,
  // onPressDirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dataPlaceDetail: state.getPlaceDetailReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetPlaceDetail: id => dispatch(fetchDatagetPlaceDetail(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeOverviewRestaurant);
// export default HomeOverviewRestaurant;

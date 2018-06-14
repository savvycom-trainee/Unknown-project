import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { search, header } from './style';
import images from '../../themes/Images';
import Card from './components/Card';
import { fetchDatagetSearchRecomend } from '../../actions/getSearchRecomend';
import Loading from '../../components/LoadingContainer';

class Search extends PureComponent {
  state = {};

  componentDidMount() {
    this.props.fetchDatagetSearchRecomend();
    console.log(this.props.dataSearchRecomend);
  }

  searchSubmit = () => {
    const value = this.search._lastNativeText;
    console.log(value);
    console.log(this.search);
  };
  placeSubmit = () => {
    const value = this.place._lastNativeText;
    console.log(value);
  };
  searchBlur = () => {
    console.log('blur');
  };

  renderRecomened = (data) => {
    if (data.isFetching === true) {
      return <Loading />;
    }
    return (
      <View style={search.resultView}>
        <FlatList
          style
          data={data.data}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HomeDetail', { data: item.idRestaurant });
              }}
            >
              <Card dataSearch={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={search.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={header.container}>
          <View style={header.searchView}>
            <TextInput
              ref={(ref) => {
                this.search = ref;
              }}
              placeholder="Search Restaurants and ..."
              style={[header.input, { textAlign: 'center' }]}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.searchSubmit}
              onBlur={this.searchBlur}
            />
          </View>
        </View>
        <Text style={search.title}> Recommended for you </Text>
        {this.renderRecomened(this.props.dataSearchRecomend)}
      </View>
    );
  }
}

// export default Search;
Search.propTypes = {
  // navigation: PropTypes.shape({
  //   navigate: PropTypes.func.isRequired,
  //   // getParam: PropTypes.func.isRequired,
  //   // goBack: PropTypes.func.isRequired,
  // }),
  fetchDatagetSearchRecomend: PropTypes.func.isRequired,
  // dataSearchRecomend: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dataSearchRecomend: state.getSearchRecomendReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetSearchRecomend: () => dispatch(fetchDatagetSearchRecomend()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

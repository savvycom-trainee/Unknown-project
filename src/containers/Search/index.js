import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { search, header } from './style';
// import images from '../../themes/Images';
import Card from './components/Card';
import { fetchDatagetSearchRecomend } from '../../actions/getSearchRecomend';
import { fetchDataGetAddSearch } from '../../actions/getAddbySearchAction';
import Loading from '../../components/LoadingContainer';

class Search extends PureComponent {
  state = {
    queryText: '',
  };

  componentDidMount() {
    this.props.fetchDatagetSearchRecomend(this.state.queryText);
  }

  searchSubmit = () => {
    this.props.fetchDataGetAddSearch(21.0176556, 105.8063218, this.state.queryText);
  };

  searchBlur = () => {
    console.log('blur');
  };

  renderRecomened = (data, labelText) => {
    if (data.isFetching === true) {
      return <Loading />;
    }
    if (labelText == 'Recommended for you') {
      return (
        <View style={search.resultView}>
          <Text style={search.title}>{labelText}</Text>
          <FlatList
            data={data.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
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
    }
    return (
      <View style={search.resultView}>
        <Text style={search.title}>
          Found {data.data.length} {labelText} after 0.5s
        </Text>
        <FlatList
          style
          data={data.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => {
                this.props.navigation.navigate('HomeDetail', { data: item.place_id });
              }}
            >
              <Card dataSearch={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  renderResult = (queryText) => {
    if (queryText === '') {
      return this.renderRecomened(this.props.dataSearchRecomend, 'Recommended for you');
    }
    return this.renderRecomened(this.props.dataSearchAdd, 'Result');
  };

  render() {
    console.log(this.props.dataSearchAdd);

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
              onChangeText={text => this.setState({ queryText: text })}
            />
          </View>
        </View>
        {this.renderResult(this.state.queryText)}
      </View>
    );
  }
}

// export default Search;
Search.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    //   // getParam: PropTypes.func.isRequired,
    //   // goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchDatagetSearchRecomend: PropTypes.func.isRequired,
  dataSearchRecomend: PropTypes.object.isRequired,

  fetchDataGetAddSearch: PropTypes.func.isRequired,
  dataSearchAdd: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dataSearchRecomend: state.getSearchRecomendReducers,
  dataSearchAdd: state.getAddSearchReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetSearchRecomend: queryText => dispatch(fetchDatagetSearchRecomend(queryText)),
  fetchDataGetAddSearch: (latitude, longitude, keyword) =>
    dispatch(fetchDataGetAddSearch(latitude, longitude, keyword)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

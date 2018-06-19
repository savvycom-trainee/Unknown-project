import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import statistic from './style';

class Statistic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity style={statistic.container} onPress={this.props.onPress}>
        <Text style={statistic.number}>{this.props.number}</Text>
        <Text style={statistic.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

Statistic.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

Statistic.defaultProps = {
  onPress: () => {},
};

export default Statistic;

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './style';

export default class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      select: props.defaultValue,
    };
  }

  onChange = (value, index) => {
    this.props.onChange(value);
    this.setState({ select: value });
    console.log(index);
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.props.data.map((item, index) => (
          <TouchableOpacity
            key={`${item.value}`}
            style={styles.items}
            onPress={() => this.onChange(item.value, index)}
          >
            {this.state.select === item.value ? (
              <Icon name="ios-radio-button-on" size={24} />
            ) : (
              <Icon name="ios-radio-button-off" size={24} />
            )}
            <Text> {item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

CheckBox.propTypes = {
  style: PropTypes.any, // eslint-disable-line
  data: PropTypes.array.isRequired, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

CheckBox.defaultProps = {
  defaultValue: '',
  style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

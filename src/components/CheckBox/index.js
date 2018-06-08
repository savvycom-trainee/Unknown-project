import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Icons } from '../../themes';
import styles from './style';

export default class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      select: 0,
    };
  }

  onChange = (value, index) => {
    this.props.onChange(value);
    this.setState({ select: index });
  };

  render() {
    console.log(this.props.data);
    return (
      <View style={this.props.style}>
        {this.props.data.map((item, index) => (
          <TouchableOpacity
            key={item.value}
            style={styles.items}
            onPress={() => this.onChange(item.value, index)}
          >
            <Image
              source={this.state.select === index ? Icons.checkBox : Icons.notCheckBox}
              style={styles.checkbox}
            />
            <Text>{item.text}</Text>
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
};

CheckBox.defaultProps = {
  style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
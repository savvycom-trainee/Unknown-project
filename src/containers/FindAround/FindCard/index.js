import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';
import { Images } from '../../../themes';

export default class FindCard extends React.PureComponent {
  state = {
    isFollow: false,
  };
  render() {
    const { isFollow } = this.state;
    const { item, index } = this.props;

    return (
      <TouchableOpacity style={[styles.item, { marginTop: index === 0 ? 10 : 5 }]}>
        <View style={styles.content_layout}>
          <Image source={Images.avartar} style={styles.avartar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.item_layout}>
              <Icon
                name={item.gender === 'Male' ? 'md-male' : 'md-female'}
                color={item.gender === 'Male' ? '#42bcf4' : '#ff82d5'}
                size={15}
                style={{ margin: 5 }}
              />
              <Text>{item.gender === 'Male' ? 'Nam' : 'Nữ'}</Text>
            </View>
            <View style={styles.item_layout}>
              <Icon name="ios-compass-outline" size={15} style={{ margin: 5 }} />
              <Text>{item.distance}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ isFollow: !isFollow })}
              style={[styles.button, { borderColor: !isFollow ? 'green' : 'blue' }]}
            >
              <Text style={{ color: !isFollow ? 'green' : 'blue', fontSize: 7, margin: 5 }}>
                {!isFollow ? '+ FOLLOW' : '√ FOLLOW'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
FindCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

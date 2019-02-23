import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
//make component
const { textStyle, viewStyle } = styles;
const Header = ({ headerText }) => {
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{headerText}</Text>
    </View>
  );
};

export default Header;

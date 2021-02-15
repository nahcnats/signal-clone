import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { AntDesign } from '@expo/vector-icons';

const CustomHeaderButton = props => {
  return <HeaderButton
    {...props}
    IconComponent={ AntDesign }
    iconSize={24}
    color="white"
  />
}
export default CustomHeaderButton;

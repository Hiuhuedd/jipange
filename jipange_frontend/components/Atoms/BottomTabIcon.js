import React from 'react';
import { View } from 'react-native';
import HomeIcon from '../../assets/ether.png';
import SettingIcon from '../../assets/ether.png';
import ProfileIcon from '../../assets/ether.png';
import SearchIcon from '../../assets/ether.png';

const BottomTabIcon = ({ route, isFocused }) => {
  const renderIcon = (route, isFocused) => {
    let height = 34;
    let width = 34;

    switch (route) {
      case 'Home':
        return (
          <HomeIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Search':
        return (
          <SearchIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Setting':
        return (
          <SettingIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Profile':
        return (
          <ProfileIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;

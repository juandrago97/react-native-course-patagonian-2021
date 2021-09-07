import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
  return (
    <View>
      <Image source={require('../../assets/images/gryffindor_flag.png')} />
      <Image style={styles.centerLogo} source={require('../../assets/images/hp_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerLogo: {
    position: 'relative',
    top: -60,
    left: '46%',
  },
});

export default Header;

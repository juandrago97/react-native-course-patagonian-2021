import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
  return (
    <View>
      <Image
        style={styles.backgroundFlag}
        source={require('../../assets/images/gryffindor_flag.png')}
      />
      <Image style={styles.centerLogo} source={require('../../assets/images/hp_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerLogo: {
    position: 'absolute',
    top: 10,
    left: '46%',
  },
  backgroundFlag: {
    height: 60,
  },
});

export default Header;

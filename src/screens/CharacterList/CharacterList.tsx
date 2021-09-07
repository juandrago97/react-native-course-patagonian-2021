import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CharacterList = () => {
  return (
    <View style={styles.center}>
      <Text>Character List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CharacterList;

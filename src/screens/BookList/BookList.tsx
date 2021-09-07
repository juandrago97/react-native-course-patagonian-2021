import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components';

const BookList = () => {
  return (
    <>
      <Header />
      <View style={styles.center}>
        <Text>Book List Screen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookList;

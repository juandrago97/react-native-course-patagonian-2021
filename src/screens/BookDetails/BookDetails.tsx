import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { Header, Separator, Typography } from '../../components';
import { getBookById } from '../../services';

import styles from './styles';
import { colors } from '../../utils/theme';

// @ts-ignore
const BookDetailsScreen = (/*{ route }*/) => {
  //const { id } = route.params;
  const id = 2;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getBooksData = async () => {
    setLoading(true);
    try {
      const { success, data } = await getBookById(id);
      if (success) {
        setBook(data);
      } else {
        Alert.alert(`Error getting the details of the book: ${id}`);
      }
    } catch (error) {
      console.log(`Error getting book with id: ${id} in BookDetailsScreen`, error);
      Alert.alert(`Error getting the details of the book: ${id}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooksData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <View style={styles.wholeScreenCenter}>
          <ActivityIndicator size="large" color={colors.primaryRed} />
        </View>
      </>
    );
  }

  return (
    <>
      <Header />
      <View style={styles.mainContainer}>
        <Typography size={18}>Book Detail Screen</Typography>
        <Separator />
        <Typography>{JSON.stringify(book, null, 2)}</Typography>
      </View>
    </>
  );
};

export default BookDetailsScreen;

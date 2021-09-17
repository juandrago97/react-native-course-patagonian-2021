import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, View } from 'react-native';

import { Header, Separator, Typography, SectionTitle } from '../../components';
import { getBookById } from '../../services';
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
        setBook(data[0]);
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
        <View>
          <ActivityIndicator size="large" color={colors.primaryRed} />
        </View>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <SectionTitle text={book.title} />
        <View style={styles.row}>
          <Image style={styles.bookCover} source={{ uri: book.book_covers[0].URL }} />
          <LabelValueList labelValueArray={[{ label: 'Hola', value: 'Mundo' }]} />
        </View>
      </>
    );
  }
};

interface Props {
  labelValueArray: [
    {
      label: string;
      value: string;
    },
  ];
}
const LabelValueList = (props: Props) => {
  return (
    <View style={styles.detailList}>
      {props.labelValueArray.map((labelValuePair) => {
        return (
          <View style={styles.row}>
            <Typography variant="bold">{`${labelValuePair.label}: `}</Typography>
            <Typography>{labelValuePair.value}</Typography>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  bookCover: {
    width: '50%',
    height: 400,
    borderRadius: 30,
  },
  detailList: {
    flex: 1,
  },
});

export default BookDetailsScreen;

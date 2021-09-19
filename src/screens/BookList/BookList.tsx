import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Header, CardList, SearchBar, SectionSubtitle } from '../../components';
import { getAllBooks, getBooksByName } from '../../services';

import { goToScreen } from '../../navigation/controls';

//@ts-ignore
const BooksToCardListParameters = (books) => {
  //@ts-ignore
  return books.map((book) => {
    return {
      id: book.id,
      title: book.title,
      image: book.book_covers[0].URL,
      onPress: () => goToScreen('BookDetails', { id: book.id, booksList: books }),
    };
  });
};

const BookList = () => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getBooksData = async () => {
    setLoading(true);
    try {
      const { success, data } = await getAllBooks();
      if (success) {
        setBooks(data);
      } else {
        Alert.alert('Error getting book information.');
      }
    } catch (error) {
      console.log('Error getting book information', error);
      Alert.alert('Error getting book information');
    } finally {
      setLoading(false);
    }
  };

  const getBooksName = async (name: string) => {
    setLoading(true);
    try {
      const { success, data } = await getBooksByName(name);
      if (success) {
        setBooks(data);
      } else {
        console.log('Error getting book information.');
      }
    } catch (error) {
      console.log('Error getting book information', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooksData();
  }, []);

  return (
    <View style={styles.body}>
      <Header />
      <SearchBar onChange={getBooksName} />
      <SectionSubtitle text="BOOKS" />
      {loading ? (
        <View style={styles.wholeScreenCenter}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.cardListContainer}>
          <CardList data={BooksToCardListParameters(books)} numberOfColumns={2} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E5E5E5',
  },
  cardListContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 21,
    marginHorizontal: 20,
    marginBottom: 420,
  },
  wholeScreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookList;

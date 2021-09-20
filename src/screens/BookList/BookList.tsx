import React, { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Header, CardList, SearchBar, SectionSubtitle } from '../../components';
import { getAllBooks, getBooksByName } from '../../services';
import { goToScreen } from '../../navigation/controls';
import styles from './styles';

const BooksToCardListParameters = (books: Book[]) => {
  return books.map((book) => {
    return {
      id: book.id,
      title: book.title,
      image: book.book_covers[0].URL,
      onPress: () => goToScreen('BookDetails', { id: book.id, title: book.title }),
    };
  });
};

const BookList = () => {
  const [books, setBooks] = useState<Book[] | []>([]);
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
    <>
      <Header />
      <View style={styles.sectionContent}>
        <SearchBar onChange={getBooksName} placeholder="Search a Book" />
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
    </>
  );
};

export default BookList;

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Separator,
  Typography,
  SectionTitle,
  LabelValueList,
  DescriptionCard,
} from '../../components';
import { getBookById, getAllBooks } from '../../services';
import { colors } from '../../utils/theme';
import { goToSameScreen } from '../../navigation/controls';

// @ts-ignore
const BookDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[] | null>([]);

  const getBooksData = async () => {
    setLoading(true);
    try {
      const { success, data } = await getBookById(id);
      if (success) {
        setBook(data[0]);
        const recommendedBooksResponse = await getAllBooks();
        if (recommendedBooksResponse.success) {
          setRecommendedBooks(recommendedBooksResponse.data);
        }
      } else {
        Alert.alert('Error getting the details of the book');
      }
    } catch (error) {
      console.log(`Error getting book with id: ${id} in BookDetailsScreen`, error);
      Alert.alert('Error getting the details of the book');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooksData();
  }, []);

  if (loading || !book) {
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
        <ScrollView>
          <View style={styles.sectionContent}>
            <SectionTitle text={book.title} />
            <View style={styles.row}>
              <Image style={styles.bookCover} source={{ uri: book.book_covers[0].URL }} />
              <View style={{ marginLeft: 13 }}>
                <LabelValueList labelValueArray={generateLabelValueArrayFromBook(book)} />
              </View>
            </View>
            <Separator />
            <DescriptionCard>
              <Typography size={12}>
                {
                  'Sinposis: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra erat non ligula auctor accumsan. Donec placerat urna ac nibh luctus tincidunt. Integer commodo justo eget hendrerit lacinia. Sed id neque porta, rhoncus odio quis, ornare lacus. Cras iaculis massa eget molestie mattis. Curabitur in mauris tortor. Cras et commodo magna. Integer vel vehicula massa, tempor consequat nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
                }
              </Typography>
            </DescriptionCard>
            <Separator size={12} />
            <Typography variant="bold">Other Books</Typography>
          </View>
          <Separator />
          {recommendedBooks && (
            <FlatList
              data={recommendedBooks?.map((recommendedBook) => {
                return {
                  title: recommendedBook.title,
                  id: recommendedBook.id,
                  image: recommendedBook.book_covers[0].URL,
                };
              })}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recommendedBookItem}
                  onPress={() => goToSameScreen('BookDetails', { id: item.id, title: item.title })}
                >
                  <Image style={styles.bookThumbnail} source={{ uri: item.image }} />
                  <Typography align="center" size={11}>
                    {item.title}
                  </Typography>
                </TouchableOpacity>
              )}
            />
          )}
        </ScrollView>
      </>
    );
  }
};

// @ts-ignore

const generateLabelValueArrayFromBook = (book: Book): { label: string; value: string }[] => {
  return [
    {
      label: 'Author',
      value: book.author,
    },
    {
      label: 'Publish Date',
      value: book.publish_date[0].UK,
    },
    {
      label: 'Plot take-place years',
      value: `${book.plot_take_place_years[0]} - ${book.plot_take_place_years[1]}`,
    },
  ];
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  bookCover: {
    width: 178,
    height: 278,
    borderRadius: 30,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bookThumbnail: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },
  recommendedBookItem: {
    width: 90,
    marginHorizontal: 8,
  },
});

export default BookDetailsScreen;

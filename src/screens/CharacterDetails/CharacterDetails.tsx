import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Header,
  Separator,
  Typography,
  SectionTitle,
  LabelValueList,
  DescriptionCard,
  ThumbnailList,
} from '../../components';
import { getCharacterById, getAllBooks } from '../../services';
import { colors } from '../../utils/theme';
import { goToScreen } from '../../navigation/controls';

// @ts-ignore
const CharacterDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [booksFeaturedIn, setBooksFeaturedIn] = useState<Book[] | null>(null);

  const getFeaturedBooks = async (ids: number[]) => {
    try {
      let { success, data } = await getAllBooks();
      if (success) {
        const booksFeatured = data.filter((book) => ids.some((bookId) => bookId == book.id));
        console.log(booksFeatured);
        setBooksFeaturedIn(booksFeatured);
      } else {
        Alert.alert('Error getting the details of the ss');
      }
    } catch (error) {
      console.log(`Error getting book with id: ${id} in BookDetailsScreen`, error);
      Alert.alert('Error getting the details of the ssss');
    }
  };

  const getCharacterData = async () => {
    setLoading(true);
    try {
      let { success, data } = await getCharacterById(id);
      if (success) {
        setCharacter(data[0]);
        await getFeaturedBooks(data[0].books_featured_in);
      } else {
        Alert.alert('Error getting the details of the character');
      }
    } catch (error) {
      console.log(`Error getting character with id: ${id}`, error);
      Alert.alert('Error getting the details of the character');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacterData();
  }, []);

  if (loading || !character) {
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
        <ScrollView style={styles.sectionContent}>
          <SectionTitle text={character.name} />
          <View style={styles.row}>
            <View style={{ marginLeft: 13 }}>
              <LabelValueList labelValueArray={generateLabelValueArrayFromCharacter(character)} />
            </View>
          </View>
          <Separator />
          <DescriptionCard>
            <Typography size={12}>
              {
                'Involvement: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra erat non ligula auctor accumsan. Donec placerat urna ac nibh luctus tincidunt. Integer commodo justo eget hendrerit lacinia. Sed id neque porta, rhoncus odio quis, ornare lacus. Cras iaculis massa eget molestie mattis. Curabitur in mauris tortor. Cras et commodo magna. Integer vel vehicula massa, tempor consequat nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
              }
            </Typography>
          </DescriptionCard>
          <Separator />
          <Typography variant="bold" size={14}>
            Books Featured In
          </Typography>
          <Separator />
          {booksFeaturedIn && (
            <ThumbnailList
              data={booksFeaturedIn.map((book) => {
                return {
                  text: book.title,
                  id: book.id,
                  image: book.book_covers[0].URL,
                  onPress: () =>
                    goToScreen('BookDetails', {
                      id: book.id,
                      title: book.title,
                    }),
                };
              })}
            />
          )}
          <Separator size={20} />
        </ScrollView>
      </>
    );
  }
};

// @ts-ignore

const generateLabelValueArrayFromCharacter = (
  character: Character,
): { label: string; value: string }[] => {
  const labelValue = [];
  if (character.species) labelValue.push({ label: 'Species', value: character.species });
  if (character.birth) labelValue.push({ label: 'Birth', value: character.birth });
  if (character.death) labelValue.push({ label: 'Death', value: character.death });
  if (character.eye_color) labelValue.push({ label: 'Eye Color', value: character.eye_color });
  if (character.gender) labelValue.push({ label: 'Gender', value: character.gender });
  if (character.house) labelValue.push({ label: 'House', value: character.house });
  if (character.hair_color) labelValue.push({ label: 'Hair Color', value: character.hair_color });
  if (character.wand) labelValue.push({ label: 'Wand', value: character.wand });
  if (character.patronus) labelValue.push({ label: 'Patronus', value: character.patronus });
  if (character.associated_groups) {
    labelValue.push({ label: 'Associated Groups', value: character.associated_groups.join(', ') });
  }
  return labelValue;
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

export default CharacterDetailsScreen;

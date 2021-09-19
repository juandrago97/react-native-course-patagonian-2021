import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Header, CardList, SearchBar, SectionSubtitle } from '../../components';
import { getAllCharacters, getCharactersByName } from '../../services';

import { goToScreen } from '../../navigation/controls';

const CharactersToCardListParameters = (characters: Character[]) => {
  return characters.map((character) => {
    return {
      id: character.id,
      title: character.name,
      image: '',
      onPress: () => goToScreen('BookDetails', { id: character.id }),
    };
  });
};

const CharacterListScreen = () => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCharactersData = async () => {
    setLoading(true);
    try {
      const { success, data } = await getAllCharacters();
      if (success) {
        setCharacters(data);
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

  const getCharactersName = async (name: string) => {
    setLoading(true);
    try {
      const { success, data } = await getCharactersByName(name);
      if (success) {
        setCharacters(data);
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
    getCharactersData();
  }, []);

  return (
    <View style={styles.body}>
      <Header />
      <SearchBar onChange={getCharactersName} />
      <SectionSubtitle text="CHARACTERS" />
      {loading ? (
        <View style={styles.wholeScreenCenter}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.cardListContainer}>
          <CardList data={CharactersToCardListParameters(characters)} numberOfColumns={2} />
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
    paddingTop: 20,
    marginHorizontal: 20,
    marginBottom: 350,
  },
  wholeScreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CharacterListScreen;

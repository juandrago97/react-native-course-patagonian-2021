import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Header, SearchBar, SectionSubtitle, Typography } from '../../components';
import { getAllCharacters, getCharactersByName } from '../../services';

import { goToScreen } from '../../navigation/controls';

import gryffindorLogo from '../../assets/images/gryffindor.jpg';
import hufflepuffLogo from '../../assets/images/hufflepuff.jpg';
import ravenclawLogo from '../../assets/images/ravenclaw.jpg';
import slytherinLogo from '../../assets/images/slytherin.jpg';

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
    <>
      <Header />
      <View style={styles.sectionContent}>
        <SearchBar onChange={getCharactersName} placeholder="Search a Character" />
        <SectionSubtitle text="CHARACTERS" />
        {loading ? (
          <View style={styles.wholeScreenCenter}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.cardListContainer}>
            <FlatList data={characters} renderItem={renderItem} />
          </View>
        )}
      </View>
    </>
  );
};

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.rowCard}
      onPress={() => goToScreen('CharacterDetails', { id: item.id })}
    >
      {item.house ? (
        <Image style={styles.rowImage} source={houseLogos[item.house]} />
      ) : (
        <View style={styles.rowImage} />
      )}
      <View style={styles.rowText}>
        <Typography size={18}>{item.name}</Typography>
        <Typography size={14}>{item.associated_groups ? item.associated_groups[0] : ''}</Typography>
      </View>
    </TouchableOpacity>
  );
};

const houseLogos = {
  Gryffindor: gryffindorLogo,
  Ravenclaw: ravenclawLogo,
  Slytherin: slytherinLogo,
  Hufflepuff: hufflepuffLogo,
};

const styles = StyleSheet.create({
  sectionContent: {
    paddingTop: 20,
    backgroundColor: '#E5E5E5',
  },
  cardListContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  wholeScreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCard: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  rowImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
  },
  rowText: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 15,
  },
});

export default CharacterListScreen;

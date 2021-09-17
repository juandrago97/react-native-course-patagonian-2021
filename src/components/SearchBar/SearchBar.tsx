import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../utils/theme';

interface Props {
  onChange: (text: string) => void;
}

const SearchBar = (props: Props) => {
  //const [textContent, setTextContent] = useState('');
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search a Book"
        placeholderTextColor={colors.primaryRed}
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colors.primaryYellow,
    color: colors.primaryRed,
    borderRadius: 48,
    paddingHorizontal: 53,
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default SearchBar;

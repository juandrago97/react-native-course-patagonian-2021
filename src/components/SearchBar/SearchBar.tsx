import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../utils/theme';

interface Props {
  onChange: (text: string) => void;
  placeholder: string;
}

const SearchBar = (props: Props) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder={props.placeholder}
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

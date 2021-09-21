import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';
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

export default SearchBar;

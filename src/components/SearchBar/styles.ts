import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';

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

export default styles;

import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 30,
    flex: 1,
  },
  cardImage: {
    borderRadius: 30,
    width: '100%',
    height: 200,
  },
  cardText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default styles;

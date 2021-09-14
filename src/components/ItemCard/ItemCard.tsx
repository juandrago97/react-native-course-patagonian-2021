import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Typography from '../Typography';

interface Props {
  title: string;
  image: string;
}

const ItemCard = (props: Props) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: props.image }} />
      <View style={styles.cardText}>
        <Typography>{props.title}</Typography>
      </View>
    </View>
  );
};

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

export default ItemCard;

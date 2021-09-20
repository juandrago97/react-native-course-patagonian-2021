import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../Typography';

interface Props {
  title: string;
  image: string;
  onPress: () => void;
}

const ItemCard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Image style={styles.cardImage} source={{ uri: props.image }} />
      <View style={styles.cardText}>
        <Typography>{props.title}</Typography>
      </View>
    </TouchableOpacity>
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

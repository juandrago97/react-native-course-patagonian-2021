import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Typography from '../Typography';
import styles from './styles';

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

export default ItemCard;

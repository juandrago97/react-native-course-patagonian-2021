import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { Typography } from '..';
import styles from './styles';

interface Props {
  data: {
    text: string;
    image: string;
    onPress: () => void;
  }[];
}

const ThumbnailList = (props: Props) => {
  return (
    <FlatList
      data={props.data}
      horizontal={true}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.recommendedBookItem} onPress={item.onPress}>
          <Image style={styles.bookThumbnail} source={{ uri: item.image }} />
          <Typography align="center" size={11}>
            {item.text}
          </Typography>
        </TouchableOpacity>
      )}
    />
  );
};

export default ThumbnailList;

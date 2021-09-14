import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ItemCard, Separator } from '..';
export type Props = {
  data: {
    title: string;
    image: string;
  };
};

const renderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <ItemCard title={item.title} image={item.image} />
    </View>
  );
};

const CardList = (props: Props) => {
  const numColumns = 2;
  const isHorizontal = false;
  return (
    <FlatList
      data={props.data}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      horizontal={isHorizontal}
      numColumns={!isHorizontal ? numColumns : undefined}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
export default CardList;

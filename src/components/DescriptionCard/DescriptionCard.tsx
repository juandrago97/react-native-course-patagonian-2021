import React, { ReactNode } from 'react';
import { View } from 'react-native';
import styles from './styles';

interface Props {
  children: ReactNode;
}

const DescriptionCard = (props: Props) => {
  return <View style={styles.descriptionCard}>{props.children}</View>;
};

export default DescriptionCard;

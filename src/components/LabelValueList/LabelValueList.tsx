import React from 'react';
import { View } from 'react-native';
import { Typography } from '..';
import styles from './styles';

export type labelValuePair = {
  label: string;
  value: string;
};

interface Props {
  labelValueArray: [
    {
      label: string;
      value: string;
    },
  ];
}
const LabelValueList = (props: Props) => {
  return (
    <View style={styles.detailList}>
      {props.labelValueArray.map((labelValuePair) => {
        return (
          <View style={styles.row}>
            <Typography variant="bold" size={12}>{`${labelValuePair.label}: `}</Typography>
            <Typography size={12}>{labelValuePair.value.toString()}</Typography>
          </View>
        );
      })}
    </View>
  );
};

export default LabelValueList;

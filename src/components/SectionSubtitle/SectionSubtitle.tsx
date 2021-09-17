import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { Typography } from '..';

interface Props {
  text: string;
}

const SectionSubtitle = (props: Props) => {
  return (
    <View style={styles.sectionTitle}>
      <Typography align="center" color={colors.primaryRed} variant="bold" size={25}>
        {props.text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 8,
  },
});

export default SectionSubtitle;

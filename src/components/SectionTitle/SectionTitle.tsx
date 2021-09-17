import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../utils/theme';
import { Typography } from '..';

interface Props {
  text: string;
}

const SectionTitle = (props: Props) => {
  return (
    <View style={styles.sectionTitleContainer}>
      <Typography color={colors.primaryRed} variant="bold" size={25}>
        {props.text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitleContainer: {
    backgroundColor: colors.primaryYellow,
    paddingHorizontal: 66,
    paddingVertical: 30,
    borderRadius: 30,
  },
});

export default SectionTitle;

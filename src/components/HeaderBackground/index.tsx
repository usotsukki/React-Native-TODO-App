import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../theme';
import { Ellipse1, Ellipse2 } from '../../../assets/svg';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.purple,
    overflow: 'hidden',
  },
  ellipse1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  ellipse2: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <View style={styles.ellipse1}>
        <Ellipse1 />
      </View>
      <View style={styles.ellipse2}>
        <Ellipse2 />
      </View>
      {children}
    </View>
  );
};

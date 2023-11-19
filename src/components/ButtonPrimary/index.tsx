import React from 'react';
import { Text, TouchableOpacity, Dimensions, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../theme';

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    bottom: '50@ms',
    paddingHorizontal: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  buttonContainer: {
    width: '100%',
    height: '56@ms',
    borderRadius: '28@ms',
    paddingVertical: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.purple,
  },
  label: {
    color: COLORS.white,
    fontSize: '16@ms',
    fontWeight: '700',
  },
});

interface Props {
  label: string;
  onPress: () => void;
}

export default ({ label, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

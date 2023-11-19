import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowBack } from '../../../assets/svg';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../theme';

const styles = ScaledSheet.create({
  container: {
    marginLeft: 16,
    marginBottom: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <ArrowBack />
    </TouchableOpacity>
  );
};

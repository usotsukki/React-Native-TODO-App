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

interface Props {
  onPress?: () => void;
}

export default ({ onPress }: Props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ArrowBack />
    </TouchableOpacity>
  );
};

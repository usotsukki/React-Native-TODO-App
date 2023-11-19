import React, { createContext, useContext, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme';
import moment from 'moment';
import { IMAGES } from '../../../assets/png';
import DatePickerModal from '../DatePickerModal';
import { Categories } from '../../redux/appReducer';

const styles = ScaledSheet.create({
  container: {
    gap: '10@ms',
    paddingHorizontal: '10@ms',
    paddingVertical: '10@ms',
  },
  label: {
    color: COLORS.text,
    fontSize: '14@ms',
    fontWeight: '600',
  },
  placeholder: {
    color: COLORS.text,
    fontSize: '14@ms',
    fontWeight: '400',
    opacity: 0.7,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    height: moderateScale(55),
    borderRadius: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    backgroundColor: COLORS.white,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    height: moderateScale(55),
    borderRadius: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

interface Props {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onValueChange?: (value: string) => void;
  value?: string;
  children?: React.ReactNode;
}

const InputContext = createContext<Props & Partial<TextInputProps>>({});
const useInput = () => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('This component must be used within a Input component.');
  }

  return context;
};

const Input = ({
  label,
  children,
  onValueChange,
  value,
  containerStyle,
  ...props
}: Props & Partial<TextInputProps>) => {
  const contextValue = useMemo(
    () => ({
      label,
      onValueChange,
      value,
      ...props,
    }),
    [label, onValueChange, value, props],
  );

  return (
    <InputContext.Provider value={contextValue}>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>{label}</Text>
        {children}
      </View>
    </InputContext.Provider>
  );
};

const InputText = () => {
  const { label, value, onValueChange, ...props } = useInput();

  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={onValueChange}
      placeholder={label}
      placeholderTextColor={COLORS.textOpacity}
      style={[styles.textInput, props.style]}
    />
  );
};

const InputDate = () => {
  const { label, value, onValueChange } = useInput();
  const [modalVisible, setModalVisible] = React.useState(false);

  const dateValue = value ? moment(value, 'DD-MM-YYYY').toDate() : new Date();

  return (
    <TouchableOpacity
      style={styles.dateContainer}
      onPress={() => setModalVisible(true)}>
      <Text style={styles.placeholder}>{value ? value : label}</Text>
      <Image source={IMAGES.calendar} style={{ width: 24, height: 24 }} />

      <DatePickerModal
        date={dateValue}
        visible={modalVisible}
        mode={'date'}
        closeModal={() => setModalVisible(false)}
        onChangeDate={date =>
          onValueChange && onValueChange(moment(date).format('DD-MM-YYYY'))
        }
      />
    </TouchableOpacity>
  );
};

const InputTime = () => {
  const { label, value, onValueChange } = useInput();
  const [modalVisible, setModalVisible] = React.useState(false);

  const dateValue = value ? moment(value, 'HH:mm').toDate() : new Date();

  return (
    <TouchableOpacity
      style={styles.dateContainer}
      onPress={() => setModalVisible(true)}>
      <Text style={styles.placeholder}>{value ? value : label}</Text>
      <Image source={IMAGES.clock} style={{ width: 24, height: 24 }} />

      <DatePickerModal
        date={dateValue}
        visible={modalVisible}
        mode={'time'}
        closeModal={() => setModalVisible(false)}
        onChangeDate={date =>
          onValueChange && onValueChange(moment(date).format('HH:mm'))
        }
      />
    </TouchableOpacity>
  );
};

const InputCategory = () => {
  const { value, onValueChange } = useInput();

  return (
    <View style={{ flexDirection: 'row', gap: moderateScale(5) }}>
      {Object.keys(Categories).map(e => (
        <TouchableOpacity
          key={e}
          onPress={() => onValueChange && onValueChange(e)}
          style={{
            backgroundColor: value === e ? 'green' : COLORS.white,
            padding: moderateScale(4),
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(28),
          }}>
          <Image
            source={IMAGES[`category${e}` as keyof typeof IMAGES]}
            style={{ width: moderateScale(48), height: moderateScale(48) }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

Input.Text = InputText;
Input.Date = InputDate;
Input.Time = InputTime;
Input.Category = InputCategory;

export default Input;

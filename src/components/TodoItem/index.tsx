import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Status, TodoItem, changeStatus } from '../../redux/appReducer';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme';
import { IMAGES } from '../../../assets/png';
import { useAppDispatch } from '../../redux/hooks';
import { ROUTES, RootParamList } from '../../navigation';

interface Props {
  item: TodoItem;
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    width: '100%',
    height: moderateScale(80),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.gray200,
    borderBottomWidth: moderateScale(1),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.text,
  },
  time: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.textOpacity,
  },
});

export default ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const handleCheckboxPress = () => {
    dispatch(
      changeStatus({
        id: item.id,
        status: item.status === Status.done ? Status.planned : Status.done,
      }),
    );
  };

  const navigateToDetails = () => {
    navigation.navigate(ROUTES.TASK_DETAILS, { id: item.id });
  };

  return (
    <View style={styles.container} key={item.id}>
      <TouchableOpacity
        onPress={navigateToDetails}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: moderateScale(20),
          opacity: item.status === Status.done ? 0.5 : 1,
        }}>
        <Image
          source={IMAGES[`category${item.category}` as keyof typeof IMAGES]}
          style={{ width: 48, height: 48 }}
        />
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text
            style={[
              styles.title,
              item.status === Status.done && {
                textDecorationLine: 'line-through',
              },
            ]}>
            {item.title}
          </Text>
          {item.time && (
            <Text
              style={[
                styles.time,
                item.status === Status.done && {
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                },
              ]}>
              {item.time}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCheckboxPress}>
        <Image
          source={
            item.status === Status.done
              ? IMAGES.checkboxTrue
              : IMAGES.checkboxFalse
          }
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

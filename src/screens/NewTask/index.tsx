import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { ROUTES, RootParamList } from '../../navigation';
import { BackButton, ButtonPrimary, Input } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import uuid from 'react-native-uuid';
import { COLORS } from '../../theme';
import { moderateScale } from 'react-native-size-matters';
import { useAppDispatch } from '../../redux/hooks';
import { Categories, Status, TodoItem, addTodo } from '../../redux/appReducer';

export const defaultValues: Partial<TodoItem> = {
  title: '',
  date: '',
  time: '',
  notes: '',
  category: '' as Categories,
};

export default ({
  navigation,
}: StackScreenProps<RootParamList, typeof ROUTES.NEW_TASK>) => {
  const dispatch = useAppDispatch();
  const [todoFields, setTodoFields] = useState(defaultValues);

  const handleSubmit = () => {
    const { title, date, time, notes, category } = todoFields;
    if (!title || !category) {
      return Alert.alert('Please fill in title and category');
    }
    const newTodo: TodoItem = {
      title,
      category,
      notes: notes || '',
      date: date || '',
      time: time || '',
      id: uuid.v4() as string,
      status: Status.planned,
    };
    dispatch(addTodo(newTodo));
    navigation.navigate(ROUTES.HOME);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerTitle: 'Add New Task',
      headerStyle: { height: 120 },
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray200 }}>
      <Input
        label="Task Title"
        value={todoFields.title}
        onValueChange={value => setTodoFields({ ...todoFields, title: value })}>
        <Input.Text />
      </Input>
      <Input
        label="Category"
        value={todoFields.category}
        onValueChange={value =>
          setTodoFields({ ...todoFields, category: value as Categories })
        }
        containerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateScale(20),
        }}>
        <Input.Category />
      </Input>
      <View
        style={{
          flexDirection: 'row',
          gap: moderateScale(10),
        }}>
        <Input
          label="Date"
          value={todoFields.date}
          onValueChange={value => setTodoFields({ ...todoFields, date: value })}
          containerStyle={{
            flex: 1,
            paddingHorizontal: 0,
            paddingLeft: moderateScale(10),
          }}>
          <Input.Date />
        </Input>
        <Input
          label="Time"
          value={todoFields.time}
          onValueChange={value => setTodoFields({ ...todoFields, time: value })}
          containerStyle={{
            flex: 1,
            paddingHorizontal: 0,
            paddingRight: moderateScale(10),
          }}>
          <Input.Time />
        </Input>
      </View>
      <Input
        label="Notes"
        value={todoFields.notes}
        onValueChange={value => setTodoFields({ ...todoFields, notes: value })}
        style={{
          height: 180,
          paddingTop: moderateScale(16),
        }}
        multiline={true}>
        <Input.Text />
      </Input>
      <ButtonPrimary label={'Save'} onPress={handleSubmit} />
    </SafeAreaView>
  );
};

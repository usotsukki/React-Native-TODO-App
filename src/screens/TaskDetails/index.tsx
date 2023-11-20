import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect, useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { ROUTES, RootParamList } from '../../navigation';
import { BackButton, ButtonPrimary, Input } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { COLORS } from '../../theme';
import { moderateScale } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  Categories,
  TodoItem,
  editTodo,
  removeTodo,
  selectTodoById,
} from '../../redux/appReducer';

export default ({
  navigation,
  route,
}: StackScreenProps<RootParamList, typeof ROUTES.TASK_DETAILS>) => {
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const taskItem = useAppSelector(selectTodoById(id));
  const [todoFields, setTodoFields] = useState<Partial<TodoItem>>(
    taskItem as Partial<TodoItem>,
  );

  const handleDelete = () => {
    const { id } = todoFields;
    if (!id) {
      return Alert.alert('Task not found');
    }
    Alert.alert('Are you sure you want to delete this task?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(removeTodo(id));
          navigation.navigate(ROUTES.HOME);
        },
      },
    ]);
  };

  const handleSubmit = () => {
    const { title, category, id } = todoFields;
    if (!id) {
      return Alert.alert('Task not found');
    }
    if (!title || !category) {
      return Alert.alert('Please fill in title and category');
    }

    dispatch(editTodo(todoFields as TodoItem));
    navigation.navigate(ROUTES.HOME);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerRight: () => (
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            height: 48,
            width: 48,
            borderRadius: 24,
            marginRight: 16,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}>
          <Octicons name="trash" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: 'Edit Task',
      headerStyle: { height: 120 },
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray200 }}>
      <Input
        label="Task Title"
        value={todoFields?.title}
        onValueChange={value => setTodoFields({ ...todoFields, title: value })}>
        <Input.Text />
      </Input>
      <Input
        label="Category"
        value={todoFields?.category}
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

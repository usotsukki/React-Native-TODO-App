import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { FlatList, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ROUTES, RootParamList } from '../../navigation';
import { BackButton, Input, TodoItem } from '../../components';
import { debounce } from 'lodash';
import { COLORS } from '../../theme';
import { useAppSelector } from '../../redux/hooks';
import {
  TodoItem as TodoItemType,
  selectEveryTodo,
} from '../../redux/appReducer';
import { moderateScale } from 'react-native-size-matters';

export default ({
  navigation,
}: StackScreenProps<RootParamList, typeof ROUTES.TASK_LIST>) => {
  const todoList = useAppSelector(selectEveryTodo);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredTodoList, setFilteredTodoList] =
    useState<TodoItemType[]>(todoList);

  const applySearchFilter = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery) {
        return setFilteredTodoList(todoList);
      }
      setFilteredTodoList(
        todoList.filter(
          item =>
            item.title.includes(searchQuery) ||
            item.notes.includes(searchQuery) ||
            item.category.includes(searchQuery),
        ),
      );
    }, 300),
    [todoList],
  );

  useEffect(() => {
    applySearchFilter(searchText);
  }, [searchText, applySearchFilter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerTitle: 'All Tasks',
      headerStyle: { height: 120 },
      presentation: 'transparentModal',
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.gray200,
      }}>
      <Input
        value={searchText}
        onValueChange={setSearchText}
        placeholder="Search">
        <Input.Text />
      </Input>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: moderateScale(20),
        }}
        data={filteredTodoList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TodoItem item={item} preview={false} />}
      />
    </View>
  );
};

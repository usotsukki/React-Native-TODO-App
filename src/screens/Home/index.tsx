import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { ROUTES, RootParamList } from '../../navigation';
import { COLORS } from '../../theme';
import { BackButton, ButtonPrimary, HeaderBackground } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { useAppSelector } from '../../redux/hooks';
import { Status, selectTodoList } from '../../redux/appReducer';
import TodoItem from '../../components/TodoItem';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray200,
  },
  headerContainer: {
    flex: 1,
    maxHeight: '140@ms',
    alignItems: 'center',
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customHeaderBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '250@ms',
    zIndex: -1,
  },
  date: {
    fontSize: '16@ms',
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  title: {
    marginVertical: '20@ms',
    fontSize: '30@ms',
    fontWeight: '700',
    color: COLORS.white,
  },
  todoContainer: {
    marginHorizontal: moderateScale(20),
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  label: {
    color: COLORS.black,
    fontSize: '16@ms',
    fontWeight: '700',
    marginVertical: '20@ms',
    marginHorizontal: '20@ms',
  },
});

export default ({
  navigation,
}: StackScreenProps<RootParamList, typeof ROUTES.HOME>) => {
  const todoList = useAppSelector(selectTodoList);
  const pendingTasks = todoList.filter(item => item.status !== Status.done);
  const completedTasks = todoList.filter(item => item.status === Status.done);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.customHeaderBackground}>
        <HeaderBackground />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={{ flex: 0.2 }}>
              <BackButton />
            </View>
            <Text style={styles.date}>{moment().format('MMMM DD, YYYY')}</Text>
            <View style={{ flex: 0.2 }} />
          </View>
          <Text style={styles.title}>My Todo List</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: moderateScale(250) }}>
          <View style={styles.todoContainer}>
            {pendingTasks.length > 0
              ? pendingTasks.map(item => <TodoItem item={item} key={item.id} />)
              : null}
          </View>
          {pendingTasks.length > 0 && completedTasks.length > 0 && (
            <Text style={styles.label}>Completed</Text>
          )}
          <View style={styles.todoContainer}>
            {completedTasks.length > 0
              ? completedTasks.map(item => (
                  <TodoItem item={item} key={item.id} />
                ))
              : null}
          </View>
        </ScrollView>
        <ButtonPrimary
          label="Add New Task"
          onPress={() => navigation.navigate(ROUTES.NEW_TASK)}
        />
      </SafeAreaView>
    </View>
  );
};

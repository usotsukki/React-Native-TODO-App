import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import moment from 'moment';
import { DATE_FORMAT } from '../theme';

export enum Status {
  planned = 'planned',
  inprogress = 'inprogress',
  done = 'done',
}

export enum Categories {
  Task = 'Task',
  Event = 'Event',
  Goal = 'Goal',
}

export interface TodoItem {
  id: string;
  title: string;
  date: string;
  time: string;
  category: keyof typeof Categories;
  notes: string;
  status: Status;
}

interface InitialState {
  todoList: TodoItem[];
}

const initialState: InitialState = {
  todoList: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTodo: (state: InitialState, action: PayloadAction<TodoItem>) => {
      state.todoList = [...state.todoList, action.payload];
    },
    editTodo: (state: InitialState, action: PayloadAction<TodoItem>) => {
      state.todoList = state.todoList.map(e =>
        e.id === action.payload.id ? action.payload : e,
      );
    },
    removeTodo: (state: InitialState, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(e => e.id !== action.payload);
    },
    changeStatus: (
      state: InitialState,
      action: PayloadAction<{ id: string; status: Status }>,
    ) => {
      const { id, status } = action.payload;
      state.todoList = state.todoList.map(e =>
        e.id === id ? { ...e, status } : e,
      );
    },
  },
});

export const { addTodo, editTodo, removeTodo, changeStatus } = appSlice.actions;

export const selectTodoList = (store: RootState) => store.todoList;

export const selectTodoById = (id: string) => (store: RootState) =>
  store.todoList.find(e => e.id === id);

export const selectEveryTodo = createSelector([selectTodoList], todoList =>
  todoList.sort(
    (a, b) =>
      moment(a.date, DATE_FORMAT).diff(moment(b.date, DATE_FORMAT)) ||
      a.time.localeCompare(b.time),
  ),
);

export const selectTodoListByDate = (date: string) =>
  createSelector(
    [selectTodoList],
    todoList =>
      todoList
        ?.filter(e => e.date === date)
        .sort((a, b) => a.time.localeCompare(b.time)),
  );

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

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

export const { addTodo, removeTodo, changeStatus } = appSlice.actions;
export const selectTodoList = (store: RootState) => store.todoList;

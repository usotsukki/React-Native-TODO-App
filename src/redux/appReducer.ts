import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Status = 'todo' | 'doing' | 'done';

interface TodoItem {
  id: number;
  title: string;
  end_date: string;
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
    removeTodo: (state: InitialState, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(e => e.id !== action.payload);
    },
    changeStatus: (
      state: InitialState,
      action: PayloadAction<{ id: number; status: Status }>,
    ) => {
      const { id, status } = action.payload;
      state.todoList = state.todoList.map(e =>
        e.id === id ? { ...e, status } : e,
      );
    },
  },
});

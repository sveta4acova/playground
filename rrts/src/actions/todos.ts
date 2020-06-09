import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodosActions {
  type: ActionTypes.fetchTodos,
  payload: Todo[],
}

export interface DeleteTodoActions {
  type: ActionTypes.deleteTodo,
  payload: number;
}

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

    dispatch<FetchTodosActions>({
      type: ActionTypes.fetchTodos,
      payload: res.data,
    });
  }
};

export const deleteTodo = (id: number): DeleteTodoActions => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id,
  }
}

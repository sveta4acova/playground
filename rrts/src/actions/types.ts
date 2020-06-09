import { FetchTodosActions, DeleteTodoActions } from './todos';

export enum ActionTypes {
  fetchTodos,
  deleteTodo,
}

export type Action = FetchTodosActions | DeleteTodoActions;

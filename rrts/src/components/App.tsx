import React from 'react';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk'
import {Todo, fetchTodos, deleteTodo, ActionTypes} from '../actions';
import { StoreState } from '../reducers';
import { Action } from 'redux';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      fetching: false,
    }
  }

  componentDidUpdate(prevProps: Readonly<AppProps>) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  getTodos = (): void => {
    if (!this.props.todos.length) {
      this.props.fetchTodos();
      this.setState({ fetching: true });
    }
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => (
      <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>{todo.title}</div>
    ))
  }

  render() {
    return (
      <div>
        <button onClick={this.getTodos}>Fetch</button>
        {this.state.fetching && <b>LOADING</b>}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
  return { todos: state.todos };
}

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo },
)(_App);

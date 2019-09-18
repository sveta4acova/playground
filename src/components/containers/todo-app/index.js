import React from 'react';
import TodoList from '../../presentational/todo-list';
import AddTodo from '../../presentational/add-todo';
import SortTodo from '../../presentational/sort-todo';
import createTodos from './utils';
import './styles.scss';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.timeRerender = 0;
    this.state = {
      todos: createTodos(10),
      inputValue: '',
      sortBy: null,
      reverseSort: false,
      time: 0,
      timeRerender: 0,
    }
  }

  static getDerivedStateFromProps(state) {
    return {
      ...state,
      time: +new Date(),
    }
  }

  componentDidMount() {
    console.log(`приблизительное время рендера компонента - ${+new Date() - this.state.time} миллисекунд`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      console.log(`приблизительное время перерендера компонента - ${+new Date() - this.state.timeRerender} миллисекунд`);
    }
  }

  onToggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (id === todo.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          }
        }

        return todo;
      })
    }))
  };

  onChangeTodoInput = (value) => {
    this.setState({inputValue: value});
  };

  onCreateTodo = () => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: prevState.todos[prevState.todos.length - 1].id + 1,
          value: this.state.inputValue,
          isCompleted: false,
        }
      ],
      inputValue: '',
    }))
  };

  onSort = field => {
    this.setState(prevState => {
      const reverseSort = !prevState.reverseSort;
      return {
        sortBy: field,
        reverseSort,
        todos: [...prevState.todos.sort((a, b) => {
          if (a[field] > b[field]) {
            return reverseSort ? -1 : 1;
          }
          if (b[field] > a[field]) {
            return reverseSort ? 1 : -1;
          }
          return 0;
        })],
        timeRerender: +new Date(),
      };
    });
  };

  render() {
    const {todos, inputValue} = this.state;

    //при изменении любого свойства стейта все будет перерендериваться
    //будет очень тупить, если создать пару тысяч задач и пытаться вводить текст в инпут
    //надо бы сделать контейнерами хотябы TodoList, возможно SortTodo, чтобы этого избежать
    //но как делиться стейтом как не через пропсы? как менять в нем что-то из разных компонентов?
    //надо бы использовать библиотеку управления стейтом

    return (
      <div className="TodoApp">
        <AddTodo value={inputValue} onChangeTodoInput={this.onChangeTodoInput} onCreateTodo={this.onCreateTodo}/>
        <SortTodo onSort={this.onSort} />
        <TodoList todos={todos} onToggleTodo={this.onToggleTodo}/>
      </div>
    );
  }
}

export default TodoApp;
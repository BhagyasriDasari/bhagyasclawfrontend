import React, { Component } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api';
import TodoItem from './TodoItem';

class TodoList extends Component {
  state = {
    todos: [],
    text: ''
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getTodos(token);
      this.setState({ todos: response.data });
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  }

  handleAddTodo = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await createTodo(token, this.state.text);
      this.setState((prevState) => ({
        todos: [...prevState.todos, response.data],
        text: ''
      }));
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  }

  handleUpdateTodo = async (id, newText) => {
    const token = localStorage.getItem('token');
    try {
      const response = await updateTodo(token, id, newText);
      this.setState((prevState) => ({
        todos: prevState.todos.map(todo => (todo._id === id ? response.data : todo))
      }));
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  }

  handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteTodo(token, id);
      this.setState((prevState) => ({
        todos: prevState.todos.filter(todo => todo._id !== id)
      }));
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  }

  handleInputChange = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    const { todos, text } = this.state;

    return (
      <div>
        <h2>To-Do List</h2>
        <input
          type="text"
          value={text}
          onChange={this.handleInputChange}
          placeholder="New To-Do"
        />
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={this.handleUpdateTodo}
              onDelete={this.handleDeleteTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
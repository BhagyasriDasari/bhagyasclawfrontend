// src/components/Todo/TodoItem.js
import React, { Component } from 'react';

class TodoItem extends Component {
  state = {
    editing: false,
    text: this.props.todo.text
  };

  handleEdit = () => {
    this.setState({ editing: true });
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleUpdate = () => {
    this.props.onUpdate(this.props.todo._id, this.state.text);
    this.setState({ editing: false });
  }

  render() {
    const { todo, onDelete } = this.props;
    const { editing, text } = this.state;

    return (
      <li>
        {editing ? (
          <div>
            <input type="text" value={text} onChange={this.handleChange} />
            <button onClick={this.handleUpdate}>Save</button>
          </div>
        ) : (
          <div>
            {todo.text}
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        )}
      </li>
    );
  }
}

export default TodoItem;

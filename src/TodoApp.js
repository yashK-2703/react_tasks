import React, { Component } from 'react';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentTodo: '',
      priority: 'normal'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleColor = this.handleColor.bind(this);

  }

  handleChange(e) {
    this.setState({
      currentTodo: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: this.state.currentTodo,
      priority: this.state.priority
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      currentTodo: '',
      priority: 'normal'
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{paddingBottom: '20px'}}>
          <input
            type="text"
            value={this.state.currentTodo}
            onChange={this.handleChange}
            placeholder="Enter a new todo"
          />
          <select id="priority" value={this.state.priority} onChange={this.handlePriorityChange}>
             <option value="normal">Normal</option>
             <option value="high">High</option>
             <option value="low">Low</option>
          </select>
          <button type="submit">Add Todo</button>
        </form>

        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id} style={{color: this.handleColor(todo.priority)}}>
              {todo.text}
              <button onClick={() => this.removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  handlePriorityChange(event) {
    this.setState({priority: event.target.value});
  }

  handleColor(priority) {
    switch (priority) {
      case "high":
        return "red";
      case "normal":
        return "black";
      case "low":
        return "green";
    }
  }
}

export default TodoApp;

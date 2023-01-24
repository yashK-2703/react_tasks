import React, { Component } from "react";

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			currentTodo: "",
			priority: "normal",
			searchTerm: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleColor = this.handleColor.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			currentTodo: e.target.value,
			searchTerm: "",
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newTodo = {
			id: Date.now(),
			text: this.state.currentTodo,
			priority: this.state.priority,
		};
		this.setState({
			todos: [...this.state.todos, newTodo],
			currentTodo: "",
			priority: "normal",
			isSearchEnabled: false,
		});
	}

	handleSearchChange(e) {
		this.setState({
			searchTerm: e.target.value
		});
	}

	removeTodo(id) {
		const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
		this.setState({
			todos: updatedTodos,
		});
	}

	render() {
		let filteredTodos = this.state.todos.filter((todo) => todo.text.includes(this.state.searchTerm));
		return (
			<div>
				<form onSubmit={this.handleSubmit} style={{ paddingBottom: "20px" }}>
					<input
						type="text"
						value={this.state.currentTodo}
						onChange={this.handleChange}
						placeholder="Enter a new todo"
					/>
					<select
						id="priority"
						value={this.state.priority}
						onChange={this.handlePriorityChange}
					>
						<option value="normal">Normal</option>
						<option value="high">High</option>
						<option value="low">Low</option>
					</select>
					<button type="submit">Add Todo</button>
				</form>

				<form>
					<input
						type="text"
						value={this.state.searchTerm}
						onChange={this.handleSearchChange}
						placeholder="Search Todo"
					/>
				</form>

				<ul>
					{filteredTodos.map((todo) => (
						<li
							key={todo.id}
							style={{ color: this.handleColor(todo.priority) }}
						>
							{todo.text}
							<button onClick={() => this.removeTodo(todo.id)}>Remove</button>
						</li>
					))}
				</ul>

			</div>
		);
	}

	handlePriorityChange(event) {
		this.setState({ priority: event.target.value });
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

import React, { useState } from "react";

function TodoApp() {
	const [todo, setTodo] = useState([]);
	const [currentTodo, setCurrentTodo] = useState("");
	const [priority, setPriority] = useState("normal");
	const [searchTerm, setSearchTerm] = useState("");

	function handleChange(e) {
		setCurrentTodo(e.target.value);
		setSearchTerm("");
	}

	function handleSubmit(e) {
		e.preventDefault();
		const newTodo = {
			id: Date.now(),
			text: currentTodo,
			priority: priority,
		};
		setTodo([...todo, newTodo]);
		setCurrentTodo("");
		setPriority("normal");
	}

	function handleSearchChange(e) {
		setSearchTerm(e.target.value);
	}

	function removeTodo(id) {
		const updatedTodos = todo.filter((todo) => todo.id !== id);
		setTodo(updatedTodos);
	}

	function handlePriorityChange(e) {
		setPriority(e.target.value);
	}

	function handleColor(priority) {
		if (priority === "high") {
			return "red";
		} else if (priority === "normal") {
			return "black";
		} else {
			return "green";
		}
	}

	const todosToShow = todo.filter((todos) => todos.text.includes(searchTerm));
	return (
		<div>
			<form onSubmit={handleSubmit} style={{ paddingBottom: "20px" }}>
				<input
					type="text"
					value={currentTodo}
					onChange={handleChange}
					placeholder="Enter a new todo"
				/>
				<select
					id="priority"
					value={priority}
					onChange={handlePriorityChange}
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
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="Search Todo"
				/>
			</form>

			<ul>
				{todosToShow.map((todo) => (
					<li
						key={todo.id}
						style={{ color: handleColor(todo.priority) }}
					>
						{todo.text}
						<button onClick={() => removeTodo(todo.id)}>Remove</button>
					</li>
				))}
			</ul>
		</div >
	);
}
export default TodoApp;
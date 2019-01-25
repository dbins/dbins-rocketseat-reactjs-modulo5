import React, { Component, Fragment } from "react";

export default class TodoList2 extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    const todos = localStorage.getItem("todos");
    if (todos) {
      this.setState({ todos: JSON.parse(todos) });
    }
  }

  addTodo = () => {
    this.setState({
      todos: [...this.state.todos, { id: Math.random, text: "novo todo" }]
    });
  };

  removeTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
    this.saveTodos();
  };

  saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    this.saveTodos();
  };

  render() {
    return (
      <Fragment>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id} onClick={() => this.removeTodo(todo.id)}>
              {todo.text}
            </li>
          ))}
        </ul>
        <button onClick={this.addTodo}>Adicionar TODO</button>
      </Fragment>
    );
  }
}

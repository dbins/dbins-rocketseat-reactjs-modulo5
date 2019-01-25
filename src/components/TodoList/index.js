import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TodosActions } from "../../store/ducks/todos";

const TodoList = ({ todos, addTodo, removeTodo }) => (
  <Fragment>
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => removeTodo(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
    <button onClick={() => addTodo("Novo Todo")}>Adicionar TODO</button>
  </Fragment>
);

const mapStateToProps = state => ({
  todos: state.todos
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(TodosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

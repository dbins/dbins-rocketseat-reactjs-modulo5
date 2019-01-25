import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import TodoList from "../TodoList/index";
import TodoList2 from "../TodoList/index2";
import createMockStore from "redux-mock-store";
import { Creators as TodosActions } from "../../store/ducks/todos";

const mockStore = createMockStore();
const store = mockStore({
  todos: [
    { id: 0, text: "todo 1" },
    { id: 1, text: "todo 2" },
    { id: 2, text: "todo 3" },
    { id: 3, text: "todo 4" }
  ]
});

const todos = [
  { id: 0, text: "todo 1" },
  { id: 1, text: "todo 2" },
  { id: 2, text: "todo 3" },
  { id: 3, text: "todo 4" }
];

describe("Todo List Component", () => {
  it("should render todos", () => {
    const wrapper = shallow(<TodoList2 />);
    wrapper.setState({ todos: todos });
    console.log(wrapper.html());
    expect(wrapper.find("li")).toHaveLength(4);
  });

  it("should be able to add new todo", () => {
    const wrapper = shallow(<TodoList2 />);
    wrapper.setState({ todos: todos });
    console.log(wrapper.html());
    wrapper.find("button").simulate("click");
    expect(wrapper.find("li")).toHaveLength(5);
  });

  it("should be able to remove todo", () => {
    const wrapper = shallow(<TodoList2 />);
    wrapper.setState({ todos: todos });
    wrapper
      .find("li")
      .first()
      .simulate("click");
    expect(wrapper.state("todos")).not.toContain(todos[0]);
  });

  it("should load todos from localStorage", () => {
    sinon.stub(localStorage, "getItem").returns(JSON.stringify(todos));
    const wrapper = shallow(<TodoList2 />);
    console.log(wrapper.state());
    expect(wrapper.state("todos")).toEqual(todos);
  });

  it("should save todos to localStorage when added new todo", () => {
    const spy = sinon.spy(localStorage, "setItem");
    const wrapper = shallow(<TodoList2 />);
    wrapper.instance().addTodo();
    //Executado apenas uma vez
    expect(spy.calledOnce).toBe(true);
  });
});

describe("REDUX - Todo List Component", () => {
  it("REDUX - should render todos", () => {
    const wrapper = shallow(<TodoList />, { context: { store } });
    console.log(wrapper.html());
    expect(wrapper.dive().find("li")).toHaveLength(4);
  });

  it("REDUX  - should be able to add new todo", () => {
    const wrapper = shallow(<TodoList />, { context: { store } });
    console.log(wrapper.html());
    wrapper
      .dive()
      .find("button")
      .simulate("click");
    expect(store.getActions()).toContainEqual(
      TodosActions.addTodo("Novo todo")
    );
  });

  it("REDUX  - should be able to remove todo", () => {
    const wrapper = shallow(<TodoList />, { context: { store } });
    wrapper
      .dive()
      .find("li")
      .first()
      .simulate("click");
    expect(store.getActions()).toContainEqual(
      TodosActions.removeTodo(todos[0].id)
    );
  });
});

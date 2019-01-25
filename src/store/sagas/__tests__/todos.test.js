import SagaTester from "redux-saga-tester";
import api from "../../../services/api";
import MockAdapter from "axios-mock-adapter";
import rootSaga from "../index";
import {
  Types as TodosTypes,
  Creators as TodosActions
} from "../../ducks/todos";

const apiMock = new MockAdapter(api);

describe("Todos Saga", () => {
  let sagaTester = null;
  //Executado antes de cada teste
  beforeEach(() => {
    sagaTester = new SagaTester();
    sagaTester.run(rootSaga);
  });

  it("should be able to fetch todos from API", async () => {
    apiMock
      .onGet("todos")
      .reply(200, [
        { id: 0, text: "todo 1" },
        { id: 1, text: "todo 2" },
        { id: 2, text: "todo 3" },
        { id: 3, text: "todo 4" }
      ]);
    sagaTester.dispatch(TodosActions.getTodosRequest());
    await sagaTester.waitFor(TodosTypes.GET_SUCCESS);
    expect(sagaTester.getLatestCalledAction()).toEqual(
      TodosActions.getTodosSuccess([
        { id: 0, text: "todo 1" },
        { id: 1, text: "todo 2" },
        { id: 2, text: "todo 3" },
        { id: 3, text: "todo 4" }
      ])
    );
  });

  it("should fail if response is not OK", async () => {
    apiMock
      .onGet("todos")
      .reply(400, [
        { id: 0, text: "todo 1" },
        { id: 1, text: "todo 2" },
        { id: 2, text: "todo 3" },
        { id: 3, text: "todo 4" }
      ]);
    sagaTester.dispatch(TodosActions.getTodosRequest());
    await sagaTester.waitFor(TodosTypes.GET_FAILURE);
    expect(sagaTester.getLatestCalledAction()).toEqual(
      TodosActions.getTodosFailure("Houve um erro")
    );
  });
});

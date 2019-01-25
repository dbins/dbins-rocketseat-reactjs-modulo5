import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import { Creators as TodosCreators } from "../ducks/todos";

export function* getTodos() {
  try {
    const response = yield call(api.get, "todos");
    yield put(TodosCreators.getTodosSuccess(response.data));
  } catch (err) {
    yield put(TodosCreators.getTodosFailure("Houve um erro"));
  }
}

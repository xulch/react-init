import { call, put } from "redux-saga/effects";
import { FETCHING_DATA_SUCCESS } from "../constant"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* fetchData() {
    yield call(delay, 1000);
    yield put({ type: FETCHING_DATA_SUCCESS, code: 0, data: 100 });
}
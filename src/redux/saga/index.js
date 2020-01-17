import { takeEvery, takeLatest } from "redux-saga/effects";
import { FETCHING_DATA } from "../constant"
import { fetchData } from "./counter";

export default function* rootSage() {
    yield takeEvery(FETCHING_DATA, fetchData)
}
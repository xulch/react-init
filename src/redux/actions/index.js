import { INCREMENT, DECREMENT, FETCHING_DATA } from "../constant"

// 增加 state 次数的方法
export const increment = () => ({
  type: INCREMENT
});

// 减少 state 次数的方法
export const decrement = () => ({
  type: DECREMENT
});

export const fetchData = () => ({
  type: FETCHING_DATA
})



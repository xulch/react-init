// 增加 state 次数的方法
export const increment = () => ({
    type: "INCREMENT"
  });
  
  // 减少 state 次数的方法
  export const decrement = () => ({
    type: "DECREMENT"
  });
  
  export const getData = () => ({
    type: "FETCHING_DATA"
  })
  
  export const getDataSuccess = data => ({
    type: "FETCHING_DATA_SUCCESS",
    ...data
  })
  
  export const getDataFailure = () => ({
    type: "FETCHING_DATA_FAILURE"
  })
  
  export const fetchData = () => {
    return dispatch => {
      dispatch(getData())
      setTimeout(() => {
        dispatch(getDataSuccess({code: 0, data: 100}))
      }, 1000)
    }
  }
  
  
  
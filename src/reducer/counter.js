const counter = (data = {
    state: 0
}, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                state: data.state + 1
            };
        case "DECREMENT":
            return {
                state: data.state - 1
            };
        case "FETCHING_DATA":
            return {
                state: data.state,
                    message: '开始异步获取数据'
            }
            case "FETCHING_DATA_SUCCESS":
                return {
                    state: action.data,
                        message: '成功获取数据'
                }
                default:
                    return data;
    }
};

export default counter
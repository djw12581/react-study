export default (state, action) => {
    const { type, payload } = action;
    const { username, password } = state
    switch (type) {
        case "ChangeInput":
            console.log('username', state)
            return {
                ...state,
                username: payload
            };
        case "ChangePwd":
            console.log('pwd', state)
            return {
                ...state,
                password: payload
            };
        case "ChangeShow":
            console.log('CheckLogin', state)
            return {
                ...state,
                show: payload
            };
        default:
            return state;
    }
}

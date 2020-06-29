import { ADD_TOKEN, ADD_LOGIN_ERROR } from "../actions/actions"

const initialState = {
    token: null,
    loginError: false
}

const handleState = (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.token }
        case ADD_LOGIN_ERROR:
            return { ...state, loginError: action.loginError }
        default:
            return state
    }
}

export default handleState
import { ADD_TOKEN, ADD_USER_ID } from "../actions/actions"

const initialState = {
    token: null,
    userId: null
}

const handleState = (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.token }
        case ADD_USER_ID:
            return { ...state, userId: action.userId }
        default:
            return state
    }
}

export default handleState
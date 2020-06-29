export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_LOGIN_ERROR = "ADD_LOGIN_ERROR"

export const addToken = (token) => {
    return {
        type: ADD_TOKEN, token
    }
}

export const addLoginError = (loginError) => {
    return {
        type: ADD_LOGIN_ERROR, loginError
    }
}

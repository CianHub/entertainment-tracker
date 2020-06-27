export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER_ID = "ADD_USER_ID";

export const addToken = (token) => {
    return {
        type: ADD_TOKEN, token: token
    }
}

export const addUserId = (userId) => {
    return {
        type: ADD_USER_ID, userId: userId
    }
}

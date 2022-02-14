import {LOGOUT, SET_AUTH, SET_USER_INFO} from "../constants/userConstants";

const initialState = {
    isAuth: false,
    userInfo: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            };
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false
            };

        default:
            return state;
    }
}

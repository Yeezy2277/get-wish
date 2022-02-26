import {LOGOUT, SET_AUTH, SET_DATA, SET_NICKNAME, SET_USER_INFO} from "../constants/userConstants";

const initialState = {
    isAuth: false,
    nickname: false,
    userInfo: null,
    avatar: null,
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
        case SET_NICKNAME:
            return {
                ...state,
                nickname: action.payload
            };
        case SET_DATA:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        default:
            return state;
    }
}

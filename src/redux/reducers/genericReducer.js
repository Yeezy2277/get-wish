import { SEARCH } from '../constants/genericConstants';

const initialState = {
  openPanel: false
};

// eslint-disable-next-line default-param-last
export const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        openPanel: action.payload
      };
    default:
      return state;
  }
};

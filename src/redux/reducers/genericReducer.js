import { SEARCH } from '../constants/genericConstants';
import { RELOAD } from '../constants/wishListConstants';

const initialState = {
  openPanel: false,
  reloadValue: 0,
};

// eslint-disable-next-line default-param-last
export const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD:
      return {
        ...state,
        reloadValue: state.reloadValue + 1
      };
    case SEARCH:
      return {
        ...state,
        openPanel: action.payload
      };
    default:
      return state;
  }
};

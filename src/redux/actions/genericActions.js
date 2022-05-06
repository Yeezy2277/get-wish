import store from '../index';
import { SEARCH } from '../constants/genericConstants';
import { RELOAD } from '../constants/wishListConstants';

const { dispatch } = store;

export const searchPanelHandler = async (action) => {
  dispatch({
    type: SEARCH,
    payload: action
  });
};

export const reload = async () => {
  store?.dispatch({
    type: RELOAD
  });
};

import store from '../index';
import { SEARCH } from '../constants/genericConstants';

const { dispatch } = store;

export const searchPanelHandler = async (action) => {
  dispatch({
    type: SEARCH,
    payload: action
  });
};

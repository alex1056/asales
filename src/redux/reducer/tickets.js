import { FAILURE, LOAD_TICKETS, REQUEST, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, reviewId, response, error } = action;
  // console.log('action=', action);

  switch (type) {
    case LOAD_TICKETS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_TICKETS + SUCCESS:
      return {
        ...state,
        // entities: arrToMap(response),
        entities: response,
        loading: false,
        loaded: true,
      };
    case LOAD_TICKETS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    // case ADD_REVIEW:
    //   return produce(state, (draft) => {
    //     draft.entities[payload.restaurantId].reviews.push(reviewId);
    //   });
    default:
      return state;
  }
};

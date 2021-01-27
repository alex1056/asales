import { replace, push } from 'connected-react-router';
import { ticketsLoadingSelector, ticketsLoadedSelector } from './selectors';
import {
  INCREMENT,
  DECREMENT,
  REMOVE,
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  LOAD_REVIEWS,
  LOAD_PRODUCTS,
  LOAD_USERS,
  MAKE_ORDER,
  LOAD_TICKETS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './constants';
import {
  usersLoadingSelector,
  usersLoadedSelector,
  reviewsLoadingSelector,
  reviewsLoadedSelector,
  orderDataSelector,
} from './selectors';

export const increment = (id) => ({ type: INCREMENT, payload: { id } });
export const decrement = (id) => ({ type: DECREMENT, payload: { id } });
export const remove = (id) => ({ type: REMOVE, payload: { id } });

export const addReview = (review, restaurantId) => ({
  type: ADD_REVIEW,
  payload: { review, restaurantId },
  generateId: ['reviewId', 'userId'],
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  CallAPI: '/api/restaurants',
});

export const loadProducts = (restaurantId) => ({
  type: LOAD_PRODUCTS,
  CallAPI: `/api/products?id=${restaurantId}`,
  restaurantId,
});

export const loadReviews = (restaurantId) => async (dispatch, getState) => {
  const state = getState();
  const loading = reviewsLoadingSelector(state, { restaurantId });
  const loaded = reviewsLoadedSelector(state, { restaurantId });

  if (loading || loaded) return;
  dispatch({ type: LOAD_REVIEWS + REQUEST, restaurantId });
  try {
    const response = await fetch(
      `/api/reviews?id=${restaurantId}`
    ).then((res) => res.json());
    dispatch({ type: LOAD_REVIEWS + SUCCESS, response, restaurantId });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error, restaurantId });
    dispatch(replace('/error'));
  }
};

export const loadTickets = () => async (dispatch, getState) => {
  const state = getState();
  const loading = ticketsLoadingSelector(state);
  const loaded = ticketsLoadedSelector(state);

  if (loading || loaded) return;
  dispatch({ type: LOAD_TICKETS + REQUEST });
  try {
    const response = await fetch(`https://front-test.beta.aviasales.ru/search`)
      .then((res) => res.json())
      .then((data) => {
        const { searchId } = data;
        return getAllTickets(searchId);
      });
    // console.log('response=', response);
    dispatch({ type: LOAD_TICKETS + SUCCESS, response });
  } catch (error) {
    dispatch({ type: LOAD_TICKETS + FAILURE, error });
    // dispatch(replace('/error'));
  }
};

async function loadTicketsChunks(searchId) {
  let response;
  try {
    response = await fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          // console.log(res);
          throw { status: res.status, statusText: res.statusText, stop: false };
        }
      })
      .catch((err) => err);
  } catch (error) {
    // console.log(`Возникла ошибка=${error}`);
    return { stop: false, ...error };
  }
  return response;
}

async function getAllTickets(searchId) {
  let i = 0;
  let chunk;
  let arr = [];
  do {
    chunk = await loadTicketsChunks(searchId);
    if (chunk.tickets) {
      arr = [...arr, ...chunk.tickets];
    }
    // console.log('chunk=', chunk);
    // console.log('arr=', arr);
  } while (!chunk.stop && i++ < 100);
  return arr;
}

export const loadUsers = () => async (dispatch, getState) => {
  const state = getState();
  const loading = usersLoadingSelector(state);
  const loaded = usersLoadedSelector(state);

  if (loading || loaded) return;

  dispatch({ type: LOAD_USERS, CallAPI: '/api/users' });
};

export const makeOrder = () => async (dispatch, getState) => {
  const state = getState();
  const postData = orderDataSelector(state);

  try {
    await dispatch({ type: MAKE_ORDER, CallAPI: '/api/order', postData });
    dispatch(push('/order-success'));
  } catch (_) {
    dispatch(push('/order-error'));
  }
};

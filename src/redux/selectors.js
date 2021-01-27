import { createSelector } from 'reselect';
import { createMatchSelector } from 'connected-react-router';
import { getById } from './utils';

const restaurantsSelector = (state) => state.restaurants.entities;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

const orderSelector = (state) => state.order.entities;

export const ticketsSelector = (state) => state.tickets.entities;
export const ticketsLoadingSelector = (state) => state.tickets.loading;
export const ticketsLoadedSelector = (state) => state.tickets.loaded;

export const allCheapiestSelector = createSelector(
  ticketsSelector,
  (tickets) => {
    try {
      let newArr = tickets.map((item) => item);
      return newArr.sort((a, b) => a.price - b.price);
    } catch (err) {
      return {};
    }
  }
);

export const allFastestSelector = createSelector(ticketsSelector, (tickets) => {
  try {
    let newArr = tickets.map((item) => item);
    return newArr.sort((a, b) => {
      return (
        a.segments.reduce((acc, item) => acc + item.duration, 0) -
        b.segments.reduce((acc, item) => acc + item.duration, 0)
      );
    });
  } catch (err) {
    return {};
  }
});

// export const orderProductsSelector = createSelector(
//   productsSelector,
//   orderSelector,
//   restaurantsIdsByProductsSelector,
//   (products, order, restaurantsIds) => {
//     return Object.keys(order)
//       .filter((productId) => order[productId] > 0)
//       .map((productId) => products[productId])
//       .map((product) => ({
//         product,
//         amount: order[product.id],
//         subtotal: order[product.id] * product.price,
//         restaurantId: restaurantsIds[product.id],
//       }));
//   }
// );

export const orderLoadingSelector = (state) => state.order.loading;
export const orderErrorSelector = (state) => state.order.error;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;

export const productsLoadingSelector = (state, props) =>
  state.products.loading[props.restaurantId];
export const productsLoadedSelector = (state, props) =>
  state.products.loaded[props.restaurantId];

export const reviewsLoadingSelector = (state, props) =>
  state.reviews.loading[props.restaurantId];
export const reviewsLoadedSelector = (state, props) =>
  state.reviews.loaded[props.restaurantId];

export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

const restaurantsIdsByProductsSelector = createSelector(
  restaurantsListSelector,
  (restaurants) =>
    restaurants
      .flatMap((rest) =>
        rest.menu.map((productId) => ({ productId, restId: rest.id }))
      )
      .reduce(
        (acc, { productId, restId }) => ({ ...acc, [productId]: restId }),
        {}
      )
);

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  restaurantsIdsByProductsSelector,
  (products, order, restaurantsIds) => {
    return Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
        restaurantId: restaurantsIds[product.id],
      }));
  }
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const productAmountSelector = getById(orderSelector, 0);
export const productSelector = getById(productsSelector);
const reviewSelector = getById(reviewsSelector);

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => ({
    ...review,
    user: users[review.userId]?.name,
  })
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  (_, { reviews }) => reviews,
  (reviews, ids) => {
    const ratings = ids.map((id) => reviews[id]?.rating || 0);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);

export const checkoutMatchPageSelector = createMatchSelector('/checkout');

export const orderDataSelector = createSelector(orderSelector, (order) =>
  Object.entries(order).map(([id, amount]) => ({ id, amount }))
);

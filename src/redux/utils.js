import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';

// export const arrToMap = (arr) =>
//   arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export const arrToMap = (arr) =>
  arr.reduce((acc, item) => {
    const uuid = uuidv4();
    return { ...acc, [uuid]: item };
  }, {});

// export const arrToMap = (arr) => {
//   let i = 0;
//   return arr.reduce((acc, item) => {
//     return { ...acc, [i++]: item };
//   }, {});
// };

export const getById = (selector, defaultValue) =>
  createSelector(
    selector,
    (_, props) => props.id,
    (entity, id) => entity[id] || defaultValue
  );

/**
 * Converts array to object with sparse values.
 * Useful when for example, using a dictionary to set mass ids to a value
 * { loading: { 1: true, 4: true } }
 *
 * @param {array} array Primitive values
 * @return {object}
 */
export function objectify(array, value) {
  const result = {};

  array.forEach(key => {
    result[key] = value;
  })

  return result;
}
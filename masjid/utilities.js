// utilities.js
import _ from 'lodash';

const { camelCase, isArray, isObject, reduce } = _;

import _1 from 'lodash'

const { snakeCase } = _1

export const postProcessResponse = (result) => {

    if (!result) return result;

    if (Array.isArray(result)) {

        return transformToCamelCase(result);

    } else {

        return objTransformToCamelCase(result);

    }

}

export const wrapIdentifier = (value, origImpl) => {

    if (['*'].includes(value)) return origImpl(value);

    return origImpl(snakeCase(value));

}

/**
 * 
 * Transform object keys to camelCase.
 * 
 * @param {Object} obj - The object to transform.
 * 
 * @returns {Object} - The transformed object.
 * 
 */

export const objTransformToCamelCase = (obj) => {
  
  if (!isObject(obj)) return obj;

  return reduce(obj, (result, value, key) => {
    
    const newKey = camelCase(key);
    
    result[newKey] = isObject(value) ? objTransformToCamelCase(value) : value;
    
    return result;
    
  }, {});
  
};

/**
 * 
 * Transform an array of objects to camelCase.
 * 
 * @param {Array} array - The array to transform.
 * 
 * @returns {Array} - The transformed array.
 * 
 */

export const transformToCamelCase = (array) => {
  
  if (!isArray(array)) return array;
  

  return array.map((item) => objTransformToCamelCase(item));
  
};

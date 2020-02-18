import {actionBoilerPlate} from '../../utils';

export const POSTS = actionBoilerPlate('POSTS');

export function fetchPosts() {
  return async dispatch => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .catch(error => {
        dispatch({
          type: POSTS.ERROR,
          error: error.message,
        });
      });

    if (res) {
      dispatch({
        type: POSTS.SUCCESS,
        payload: res,
      });
    }
  };
}

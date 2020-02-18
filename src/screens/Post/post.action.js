import {actionBoilerPlate} from '../../utils';

// post - for blogpost
export const POST = actionBoilerPlate('POST');
export const COMMENTS = actionBoilerPlate('comments');

export function fetchPost(postID) {
  return async dispatch => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postID}`,
    )
      .then(res => res.json())
      .catch(error => {
        dispatch({
          type: POST.ERROR,
          error: error.message,
        });
      });

    if (res) {
      console.log(res);

      dispatch({
        type: POST.SUCCESS,
        payload: res,
      });
    }
  };
}

export function fetchComments(postID) {
  return async dispatch => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postID}`,
    )
      .then(res => res.json())
      .catch(error => {
        dispatch({
          type: COMMENTS.ERROR,
          error: error.message,
        });
      });

    if (res) {
      dispatch({
        type: COMMENTS.SUCCESS,
        payload: res,
      });
    }
  };
}

import {POSTS} from './posts.actions';

const initState = {
  posts: [],
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case POSTS.PENDING:
      return {...state, fetching: true};

    case POSTS.SUCCESS:
      return {...state, fetching: false, posts: action.payload};

    case POSTS.ERROR:
      return {...state, fetching: false, error: action.error};

    default:
      return state;
  }
};

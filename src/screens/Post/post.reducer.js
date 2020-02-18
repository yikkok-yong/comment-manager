import {POST, COMMENTS} from './post.action';

const initState = {
  post: {},
  comments: [],
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case POST.PENDING:
      return {...state, fetching: true};

    case POST.SUCCESS:
      return {...state, fetching: false, post: action.payload};

    case POST.ERROR:
      return {...state, fetching: false, error: action.error};

    case COMMENTS.PENDING:
      return {...state, fetching: true};

    case COMMENTS.SUCCESS:
      return {...state, fetching: false, comments: action.payload};

    case COMMENTS.ERROR:
      return {...state, fetching: false, error: action.error};

    default:
      return {...state};
  }
};

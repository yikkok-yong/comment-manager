import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import postsReducer from '../screens/Posts/posts.reducer';
import postReducer from '../screens/Post/post.reducer';

const reduces = combineReducers({
  posts: postsReducer,
  post: postReducer,
});

export default createStore(reduces, applyMiddleware(thunk));

/**
 *
 * @description Posts.js
 * @author yikkok <yikkok.yong@sparksoft.co>
 * @version 1.0.0
 * @since 18 February 2020
 *
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {fetchPosts} from './posts.actions';
import {List} from 'react-native-paper';

class Posts extends Component {
  componentDidMount() {
    const {fetchPosts} = this.props;

    fetchPosts();
  }

  renderPosts = ({item}) => {
    const {title, body} = item;
    return (
      <List.Item
        title={title}
        description={body}
        onPress={() => {
          this.props.navigation.navigate('Post', {
            postID: item.id,
          });
        }}
      />
    );
  };

  render() {
    const {posts} = this.props;

    return (
      <FlatList
        data={posts}
        renderItem={this.renderPosts}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}

const mapStateToDispatch = state => ({...state.posts});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchPosts}, dispatch);

export default connect(mapStateToDispatch, mapDispatchToProps)(Posts);

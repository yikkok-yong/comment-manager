/**
 *
 * @description Post.js
 * @author yikkok <yikkok.yong@sparksoft.co>
 * @version 1.0.0
 * @since 18 February 2020
 *
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchPost, fetchComments} from './post.action';
import {View, Text, FlatList} from 'react-native';
import {Title, List, Searchbar} from 'react-native-paper';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: [],
      searchValue: '',
    };
  }

  async componentDidMount() {
    const {fetchComments, fetchPost} = this.props;

    const postID = this.props.route.params?.postID || -1;

    if (postID !== -1) {
      await fetchPost(postID);
      await fetchComments(postID);
    }
  }

  renderComments = ({item}) => {
    const {email, name, body} = item;
    return (
      <List.Section>
        <List.Subheader>{email}</List.Subheader>
        <List.Item title={body} description={`Comment by ${name}`} />
      </List.Section>
    );
  };

  handleOnChangeText = text => {
    this.setState({
      searchValue: text,
    });

    if (text.length === 0) {
      this.setState({
        filtered: [],
      });
    }
  };

  handleOnIconPress = () => {
    const {searchValue} = this.state;
    const pattern = new RegExp(searchValue, 'i');

    if (this.props.comments.length > 0) {
      let filtered = [];
      this.props.comments.map(comment => {
        const isEmailMatched = pattern.test(comment.email);
        const isNameMatched = pattern.test(comment.name);
        const isContentMatched = pattern.test(comment.body);

        if (isEmailMatched || isNameMatched || isContentMatched) {
          filtered.push(comment);
        }
      });

      this.setState({
        filtered,
      });
    }
  };

  render() {
    const {post, comments} = this.props;
    const {searchValue, filtered} = this.state;

    return (
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <Title>{post.title}</Title>
        <View>
          <Text
            style={{
              textDecorationLine: 'underline',
              textDecorationColor: 'black',
              fontSize: 18,
              fontWeight: '600',
              paddingVertical: 10,
            }}>
            Post Content
          </Text>
          <Text>{post.body}</Text>
        </View>

        <View style={{flex: 1, paddingVertical: 10}}>
          <Searchbar
            value={searchValue}
            placeholder="Search comments"
            onChangeText={this.handleOnChangeText}
            onIconPress={this.handleOnIconPress}
          />
          <FlatList
            data={(filtered.length > 0 && filtered) || comments}
            renderItem={this.renderComments}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({...state.post});
const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchPost, fetchComments}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);

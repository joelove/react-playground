import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

class CommentBox extends React.Component {

  constructor() {
    super();
    this.state = {data: []};
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  loadCommentsFromServer = () => {
    fetch(this.props.url).then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then(data => {
      this.setState({data: data});
    });
  }

  handleCommentSubmit = (comment) => {
    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    }).then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
    });
  }

  render() {
    const commentNodes = this.state.data.map(comment => {
      return (
        <div className="commentBox">
          <CommentTitle title={comment.title} />
          <CommentText text={comment.text} />
        </div>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

class CommentTitle extends React.Component {
  render() {
    return (
      <div className="commentTitle">
        {this.props.title}
      </div>
    );
  }
}


class CommentText extends React.Component {
  render() {
    return (
      <div className="commentText">
        {this.props.text}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const title = this.refs.title.value.trim();
    const text = this.refs.text.value.trim();

    if (!text || !title) {
      return;
    }

    this.props.onCommentSubmit({title: title, text: text});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Title" ref="title" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

ReactDOM.render(
  <CommentBox url="http://localhost:4730" pollInterval={2000} />,
  document.getElementById('content')
);

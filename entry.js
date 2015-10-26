const React = require('react');
const ReactDOM = require('react-dom');

const data = [
  {title: 'My fancy title', text: 'This is one comment'},
  {title: 'Another title', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
];

class CommentBox extends React.Component {
  render() {
    const commentNodes = this.props.data.map(function(comment) {
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

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);

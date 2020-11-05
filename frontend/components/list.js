import React, { Component } from "react";
import DataService from "../service";

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    this.removeAllPosts = this.removeAllPosts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrievePosts() {
    DataService.getAll()
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePosts();
    this.setState({
      currentPost: null,
      currentIndex: -1
    });
  }

  setActivePost(post, index) {
    this.setState({
      currentPost: post,
      currentIndex: index
    });
  }

  removeAllPosts() {
    DataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    DataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, posts, currentPost, currentIndex } = this.state;

    return (
      <div className="list row">
  
        <div className="col-md-6">
          <h4>Posts List</h4>

          <ul className="list-group">
            {posts &&
              posts.map((post, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPosts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPost ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPost.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPost.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPost.created }
              </div>

     
            </div>
          ) : (
            <div>
              <br />
              <p></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
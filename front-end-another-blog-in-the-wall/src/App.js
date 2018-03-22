import React, {Component} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  Navbar,
  NavbarBrand,
  Alert,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import './App.css';

class App extends Component {

  state = {
    posts: [],
    error: false
  }

  async componentDidMount() {
    try {
      const {data} = await axios.get("http://localhost:3333/post");
      const {posts} = data;
      this.setState({posts: posts});
    } catch (e) {
      this.setState({error: true});
    }
  }

  render() {

    const {posts, error} = this.state;

    return (
      <div className="App">
        <Navbar
          className="navbar-main"
          color="dark"
          dark
          fixed="top">
          <NavbarBrand>Another blog in the wall</NavbarBrand>
        </Navbar>
        <div id="body">
          {error &&
          <Alert color="danger">
            Error getting posts from server
          </Alert>}
          {!error &&
          <ListGroup>
            <ListGroupItem key="add">
              <Button color="primary">Add new post</Button>
            </ListGroupItem>
            {posts.length && posts.map((post, i) => <ListGroupItem key={i}>{post.title} <i class="fa fa-edit"></i></ListGroupItem>)}
          </ListGroup>}
        </div>
      </div>
    );
  }
}

export default App;

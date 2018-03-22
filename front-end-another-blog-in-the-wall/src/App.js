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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import './App.css';

class App extends Component {

  state = {
    posts: [],
    error: false,
    modalAddNew: false,
    modalEdit: false,
    post: {},
    title: '',
    body: '',
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
              <Button
                color="primary"
                onClick={this.toggleAddNew}>Add new post</Button>
            </ListGroupItem>
            {posts.length && posts.map((post, i) => <ListGroupItem key={i}>
              {post.title} <Button outline className="fa fa-edit" color="primary" value={post}
                                   onClick={() => this.toggleEdit(post)}></Button>
            </ListGroupItem>)}
          </ListGroup>}
        </div>

        <Modal isOpen={this.state.modalAddNew} toggle={this.toggleAddNew}>
          <ModalHeader toggle={this.toggleAddNew}>Add a new post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input onChange={this.titleChanged} type="text" name="title" id="title" placeholder="Post title"/>
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Input onChange={this.bodyChanged} type="text" name="body" id="title" placeholder="Post title"/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.savePost}>Save post</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
          <ModalHeader toggle={() => this.toggleEdit()}>Edit existing post</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save post</Button>{' '}
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  savePost = async () => {
    const {title, body} = this.state;
    const data = {
      title: title,
      body: body,
      authorId: '123456'
    };
    const config = {
      headers: {'token': 'sup3rS3cr3tT0k3n'},
    };
    try {
      const response = await axios.post('http://localhost:3333/post', data, config);
      console.log(`LOG: response`, JSON.stringify(response, null, 3));
    } catch (e) {
      console.log(`LOG: e`, JSON.stringify(e, null, 3));
    }
  }

  toggleAddNew = () => {
    this.setState({
      modalAddNew: !this.state.modalAddNew,
    });
  }

  toggleEdit = (post = null) => {
    this.setState({
      modalEdit: !this.state.modalEdit,
      post: post,
    });
  }

  titleChanged = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  bodyChanged = (e) => {
    this.setState({
      body: e.target.value
    });
  }
}

export default App;

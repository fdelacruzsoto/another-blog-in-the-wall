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
    modalView: false,
    post: {},
    title: '',
    body: '',
    alertVisible: false,
    data: {error: false}
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

    const {posts, error, data, alertVisible} = this.state;

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
          <Alert color="danger" isOpen={alertVisible} toggle={this.toggleAlert}>
            {data.message && data.message}
          </Alert>
          {!error &&
          <ListGroup>
            <ListGroupItem key="add">
              <Button
                color="primary"
                onClick={this.toggleAddNew}>Add new post</Button>
            </ListGroupItem>
            {posts.length && posts.map((post, i) => <ListGroupItem key={i}>
              {post.title} <Button outline className="fa fa-edit" color="primary" value={post}
                                   onClick={() => this.toggleEdit(post)}/>
              <Button outline className="fa fa-eye" color="primary" value={post}
                      onClick={() => this.toggleViewPost(post)}/>
            </ListGroupItem>)}
          </ListGroup>}
        </div>

        <Modal isOpen={this.state.modalView} toggle={this.toggleViewPost}>
          <ModalHeader toggle={() => this.toggleViewPost()}>{this.state.post && this.state.post.title}</ModalHeader>
          <ModalBody>
            {this.state.post && this.state.post.body}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalAddNew} toggle={this.toggleAddNew}>
          <ModalHeader toggle={this.toggleAddNew}>Add a new post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input onChange={this.titleChanged}
                       type="text"
                       name="title"
                       id="title"
                       placeholder="Post title"/>
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Input onChange={this.bodyChanged}
                       type="text"
                       name="body"
                       id="title"
                       placeholder="Post title"/>
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
            <Form>
              <FormGroup>
                If you don't want to update a field you can leave the input empty
                <Label for="title">{this.state.post ? this.state.post.title : ''}</Label>
                <Input onChange={this.titleChanged}
                       type="text"
                       name="title"
                       id="title"
                       placeholder="Post new title"/>
              </FormGroup>
              <FormGroup>
                <Label for="body">{this.state.post ? this.state.post.body : ''}</Label>
                <Input onChange={this.bodyChanged}
                       type="text"
                       name="body"
                       id="title"
                       placeholder="Post new body"/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button value={this.state.post && this.state.post._id} color="primary" onClick={this.updatePost}>Save post</Button>
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
      this.setState({
        modalAddNew: !this.state.modalAddNew,
        data: response.data,
      });
    } catch (e) {
      this.setState({
        modalAddNew: !this.state.modalAddNew,
        data: e.response.data,
        alertVisible: true,
      });
    }
  }

  updatePost = async (e) => {
    const {title, body} = this.state;
    const data = {
      title: title,
      body: body,
      id: e.target.value
    };
    const config = {
      headers: {'token': 'sup3rS3cr3tT0k3n'},
    };
    try {
      const response = await axios.put('http://localhost:3333/post', data, config);
      this.setState({
        modalEdit: !this.state.modalEdit,
        data: response.data,
      });
    } catch (e) {
      this.setState({
        modalEdit: !this.state.modalEdit,
        data: e.response.data,
        alertVisible: true,
      });
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

  toggleViewPost = (post = null) => {
    this.setState({
      modalView: !this.state.modalView,
      post: post,
    });
  }

  toggleAlert = () => {
    this.setState({
      alertVisible: !this.state.alertVisible,
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

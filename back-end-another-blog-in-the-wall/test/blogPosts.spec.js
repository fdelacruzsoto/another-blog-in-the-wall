import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../src/index';
import Post from '../src/models/model.post';

const should = chai.should();
chai.use(chaiHttp);

describe('Blog project', () => {

  beforeEach((done) => { //Before each test we empty the database
    Post.remove({}, (err) => {
      done();
    });
  });

  describe('Blog posts - CRUD', () => {

    it('It should POST a valid post', (done) => {
      const post = {
        title: "Test post",
        body: "Just a test",
        authorId: "123456",
      }
      chai.request(app)
      .post('/post')
      .set('token', 'sup3rS3cr3tT0k3n')
      .send(post)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('It should not POST a valid post without the token', (done) => {
      const post = {
        title: "Test fail post",
        body: "Just a test to fail",
        authorId: "123456",
      }
      chai.request(app)
      .post('/post')
      .send(post)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

  });

});
import mongoose from 'mongoose';
import post from '../models/model.post';

const Post = mongoose.model('Post');

export async function createPost(post) {
  const newPost = new Post(post);
  return await newPost.save();
}

export async function getPostById(id) {
  return await Post.findById(id);
}

export async function updatePostById(id, post) {
  const {title = null, body = null} = post;
  const updateData = {};
  if(title){
    updateData.title = title;
  }
  if(body){
    updateData.body = body;
  }
  if(!title && !body) {
    throw 'Empty data';
  }
  return await Post.findOneAndUpdate({_id: id}, {$set: updateData}, {new: true});
}

export async function getAllPosts() {
  return await Post.find({});
}
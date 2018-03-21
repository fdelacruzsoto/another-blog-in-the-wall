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
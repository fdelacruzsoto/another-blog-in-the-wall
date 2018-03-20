import mongoose from 'mongoose';
import post from '../models/model.post';
const Post = mongoose.model('Post');

export async function createPost(req) {
    const newPost = new Post(req.body);
    try{
      return await newPost.save();;
    } catch (e) {
      return e;
    }
}
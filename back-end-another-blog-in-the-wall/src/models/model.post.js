import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Post', PostSchema);
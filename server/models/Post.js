import mongoose from "mongoose";
// library for MongoDB which allows you to define schemas for your data.
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
//The { timestamps: true } option in the schema will automatically add createdAt and updatedAt fields to the 
//model which will store the timestamps for when the document was created and last updated.
const Post = mongoose.model("Post", postSchema);

export default Post;

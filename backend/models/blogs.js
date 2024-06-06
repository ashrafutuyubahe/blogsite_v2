const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true  
  },
  alt: {
    type: String,
    trim: true 
  }
});

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true 
  },
  heading: {
    type: String,
    required: true,
    trim: true  
  },
  content: {
    type: String,
    required: true,
    trim: true  
  },
  image: {
    type: ImageSchema,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true  
  },
  authorLinkedProfile: {
    type: String,
    trim: true  
  },
  authorGithubProfile: {
    type: String,
    default: 'No GitHub Profile',
    trim: true  
  }
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;

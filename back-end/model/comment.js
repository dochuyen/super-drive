import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true, 
  },
  comment: {
    type: Array,
    require: true,
  },  
});

//Export the model
export default mongoose.model("Comment", commentSchema);

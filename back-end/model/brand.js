import mongoose from "mongoose"; // Erase if already required

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

//Export the model
export default mongoose.model("Brand", brandSchema);

import express from "express";
import { commentCollection } from "../configs/connectDB.js";

const commentRouter = express.Router();

commentRouter.get('/get',async (req,res)=>{
  try{
  const allComments= await commentCollection.find().toArray();
  console.log(commentCollection)
  res.status(200).json({
    message: "Success",
    data: allComments,
  }) 
}
catch(error){
  res.status(400).json({
    message: error.message,
    data: null,
  });
}
})

commentRouter.post("/post", async (req, res) => {
    console.log("Handling POST request to /api/v1/comments");
    try{
  const { username, email, comment } = req.body;
  if (!username || !email || !comment) {
    return res.status(400).json({
      message: "Name, email, or comment is missing",
    });
  }
  const data={
    username,
    email,
    comment,
    createdAt: new Date(),
  }
  const result = await commentCollection.insertOne({
   data
  });
  console.log(result)
  return res.status(201).json({
    status: "ok",
    message: "Comment saved",
    data
    // data: result.ops[0],
  });
}
catch(error){
  res.status(400).json({
    message:error.message,
    data:null
  })
}
});

export default commentRouter;

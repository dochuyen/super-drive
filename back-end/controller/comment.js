import Comment from "../model/comment.js";

const postComment= async (req, res) => {

  const { username, comment } = req.body;
    try {
      if (!username  || !comment) {
        return res.status(400).json({
          message: "Name or comment is missing",
        });
      }
      const data = {
        username,

        comment,
        createdAt: new Date(),
      };

      const result = await Comment.create(data);

      return res.status(201).json({
        status: "ok",
        message: "Comment saved",
        data,
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: error.message,
        data: null,
      });
    }
  }
  const getComment= async (req, res) => {
    const product = await Comment.find({}).then((data) => {
      return res.status(200).json({
        status:'ok',
        message:'Yeahhhh',
        data
      });
    });
  };

  export {postComment, getComment} 
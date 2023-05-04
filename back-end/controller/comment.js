import Comment from "../model/comment.js";

const postComment= async (req, res) => {

    try {
      const { username, email, comment } = req.body;
      if (!username || !email || !comment) {
        return res.status(400).json({
          message: "Name, email, or comment is missing",
        });
      }
      const data = {
        username,
        email,
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
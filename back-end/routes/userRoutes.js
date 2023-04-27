import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";


const userRoutes = express.Router();

// userRoutes.get("/", async (req, res) => {
//   const allUsers = await find().toArray();

//   res.status(200).json({
//     message: "Success",
//     data: allUsers,
//   });
// });

// userRoutes.post("/", async (req, res) => {
//   try {
//     // lay data tu body
//     const userData = req.body;
//     // insert vao db
//     const newUser = await insertOne(userData);
//     if (!newUser.acknowledged) {
//       throw new Error("Insert failed");
//     }

//     res.status(201).json({
//       message: "Success",
//       data: {
//         ...userData,
//         _id: newUser.insertedId,
//       },
//     });
//     // return data
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//       data: null,
//     });
//   }
// });

export default userRoutes;

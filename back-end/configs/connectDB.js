// import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

export const client = new MongoClient(process.env.MONGO_DB_URL);

export const productCollection = client.db("super_drive").collection("product");
export const brandCollection = client.db("super_drive").collection("brand");
export const userCollection = client.db("super_drive").collection("user");
export const authCollection = client.db("super_drive").collection("user");
export const commentCollection = client
  .db("super_drive")
  .collection("comments");
  
  import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const dbConnect = async () => {
  try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('connect db successfully!!')
  } catch(err) {
    console.log('connect fail!!!')
  }
}


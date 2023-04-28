import mongoose from "mongoose";
import Products from "../model/product.js";

import slugify from "slugify";
const getAllProducts = async (req, res) => {
  const product = await Products.find({}).then((data) => {
    return res.status(200).json({
      success: product ? true : false,
      productData: data ? data : "cannot find product",
    });
  });
};
const getBrand = async (req, res) => {
  try {
    const { brandId } = req.params;

    const brandProduct = await Products.find({
      brand: brandId,
    }).populate("brand");

    res.json(brandProduct);
  } catch (error) {
    res.json(error);
  }
};

const createProducts = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) throw new Error("Missing input");
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Products.create(req.body);

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.path);
      const updatedProduct = await Products.findByIdAndUpdate(
        newProduct._id,
        {
          images: images,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        createProductData: updatedProduct,
      });
    }

    return res.status(200).json({
      success: true,
      createProductData: newProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { pid } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updateProduct = await Products.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    if (!updateProduct) throw new Error("Product not found");
    return res.status(200).json({
      success: true,
      updateProduct: updateProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await Products.findByIdAndDelete(pid);
    if (!deleteProduct) throw new Error("Product not found");
    return res.status(200).json({
      success: true,
      deleteProductData: deleteProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadImageProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!req.files) throw new Error("Missing Input");
    const response = await Products.findByIdAndUpdate(
      pid,
      {
        $push: { images: { $each: req.files.map((el) => el.path) } },
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      updateProduct: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { q, price } = req.query;
    if (!q) throw new Error("Missing search query");

    const products = await Products.find({
      title: { $regex: q, $options: "i" },
    });
    return res.status(200).json({
      success: true,
      productData: products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getBrand,
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  uploadImageProduct,
  searchProducts,
};

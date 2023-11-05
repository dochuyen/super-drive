import mongoose from "mongoose";
import Brand from "../model/brand.js";

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const brand = await Brand.findById(id);

    res.json(brand);
  } catch (error) {}
};

const getAll = async (req, res) => {
  try {
    const brand = await Brand.find();
    return res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.status(200).json({
      success: true,
      createProductData: brand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateBrand) throw new Error("Brand not found");
    return res.status(200).json({
      success: true,
      updateProduct: updateBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBrand = await Brand.findByIdAndDelete(id);
    if (!deleteBrand) throw new Error("Brand not found");
    return res.status(200).json({
      success: true,
      deleteBrandData: deleteBrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { getOne, getAll, createBrand, updateBrand, deleteBrand };

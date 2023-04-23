import mongoose from "mongoose";
import Products from "../model/product.js";

import slugify from "slugify";
const getAllProducts = async (req, res) => {
  const product = Products.find({}).then((data) => {
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
const getProducts = async (req, res) => {
  try {
    const queries = { ...req.query };
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((el) => {
      delete queries[el];
    });
    //format lại cá oquerater chó đúng của mongo
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|lte|lt|gt)\b/g,
      (macthedEl) => `$${macthedEl}`
    );
    const formatQueries = JSON.parse(queryString);

    //filter

    if (queries?.title)
      formatQueries.title = { $regex: queries.title, $options: "i" };
    let queryCommand = Products.find(formatQueries);
    //sort   >> Lọc

    //abc,efg >> [ abc, efg]>> abc efg
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    } else {
      queryCommand = queryCommand.sort("-createdAt");
    }
    // fields limit   // chọn hiện thị 1 trường hoặc bỏ 1 trường
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join("");
      queryCommand = queryCommand.select(fields);
    }

    //Limmit Giới hạn 1 lần lấy số data lấy về phân trang
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //Số lượng sản phẩm thỏa mã điều kiện !== số lượng sản phẩm trả về

    const response = await queryCommand.exec();
    const counts = await Products.countDocuments(formatQueries);

    return res.status(200).json({
      success: true,
      productData: response,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const createProducts = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) throw new Error("Missing input");
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Products.create(req.body);
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

const ratings = async (req, res) => {
  try {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
      throw new Error("Invalid product id");
    }

    if (!star || !pid) {
      throw new Error("Missing input");
    }

    const ratingProduct = await Products.findById(pid);

    if (!ratingProduct) {
      throw new Error("Product not found");
    }

    const alreadyRating = await ratingProduct?.ratings?.find(
      (el) => el.postedBy.toString() === _id
    );

    console.log(alreadyRating);

    if (alreadyRating) {
      //update
      await Products.updateOne(
        {
          ratings: { $elemMatch: alreadyRating },
        },
        { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
        { new: true }
      );
    } else {
      await Products.findByIdAndUpdate(
        pid,
        {
          $push: { ratings: { star, comment, postedBy: _id } },
        },
        { new: true }
      );
      console.log(response);
    }

    return res.status(200).json({
      status: true,
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

export {
  getBrand,
  getAllProducts,
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  ratings,
  uploadImageProduct,
};

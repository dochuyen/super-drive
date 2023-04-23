import productCategory from "../model/productCategory.js";

const createCategory = async (req, res) => {
  try {
    const category = await productCategory.create(req.body);
    return res.json({
      success: true,
      createCategory: category,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const category = await productCategory.find();
    return res.json({
      success: true,
      getAllCategory: category,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await productCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json({
      success: true,
      updateCategory: category,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await productCategory.findByIdAndDelete(id, req.body, {
      new: true,
    });
    return res.json({
      success: true,
      deleteCategory: category,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { createCategory, getAllCategory, updateCategory, deleteCategory };

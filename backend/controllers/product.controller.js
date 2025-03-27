import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = (req, res) => {
  try {
    const products = Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    const savedProduct = newProduct.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    const deletedProduct = Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const existingProduct = Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

  try {
    const updatedProduct = Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

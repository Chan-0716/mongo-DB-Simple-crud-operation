const express = require("express");
const router = express.Router();
const Product = require("../products/product.model.js");
const { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js");

// get all products...
router.get("/", getProducts);

// get single products...
router.get("/particular_product/:id", getSingleProduct);

// create products...
router.post("/", createProduct)

// update products...
router.put("/update_product/:id", updateProduct)

// delete products...
router.delete("/delete_product/:id", deleteProduct)

module.exports = router
const Product = require("../products/product.model.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const particularProducts = await Product.findById(id);
    res.status(200).json(particularProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).send(product);
       } catch(error) {
         res.status(500).send({ message: error.message});
       }
};

const updateProduct =  async (req, res) => {
    try {
      const { id } = req.params
      const updateProduct = await Product.findByIdAndUpdate(id, req.body)
      if (!updateProduct) {
        res.status(404).json({ message: "Product not found"})
      }
      const updatedProductData = await Product.findById(id)
      res.status(200).json(updatedProductData)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
           res.status(404).json({ message: "Product not found"})
        } else {
          res.status(200).json({ message: "Product successfully deleted" }) 
        }
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
  }

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

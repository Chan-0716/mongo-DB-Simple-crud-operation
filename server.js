const express = require("express");
const mongoose = require("mongoose");
const Product = require("./products/product.model.js")
const productRoutes = require("./routes/product.route.js")

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/products", productRoutes)

const serverPort = 3002;

app.get("/", (req, res) => {
  res.send("Hi Chandru message from server...");
});

// create table in product collection...
// app.post("/api/products", async(req, res) => {
//   try {
//    const product = await Product.create(req.body);
//    res.status(200).send(product);
//   } catch(error) {
//     res.status(500).send({ message: error.message});
//   }
//  }) 

// get all products...
// app.get("/api/products", async(req, res) => {
//  try {
//   const products = await Product.find({});
//   res.status(200).json(products)
// } catch (error) {
//   res.status(500).json({message: error.message})
//  }
// })

// get particular products by id... using get method
// app.get("/api/products/:id", async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const particularProducts = await Product.findById(id)
  //   res.status(200).json(particularProducts)
  // } catch (error) {
  //   res.status(500).json({message: error.message})
  // }
// })

// get particular products by id... using post method
// app.post("/api/products/particular_product", async (req, res) => {
//   try {
//     const id = req.body.id;
//     const particularProducts = await Product.findById(id)
//     res.status(200).json(particularProducts)
//   } catch (error) {
//     res.status(500).json({message: error.message})
//   }
// })

// update the product... using put method
// app.put("/api/products/update_product/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     const updateProduct = await Product.findByIdAndUpdate(id, req.body)
//     if (!updateProduct) {
//       res.status(404).json({ message: "Product not found"})
//     }
//     const updatedProductData = await Product.findById(id)
//     res.status(200).json(updatedProductData)
//   } catch (error) {
//     res.status(500).json({message: error.message})
//   }
// })

// delete particular product.... using post method
app.post("/api/products/delete_product", async (req, res) => {
  try {
    const id = req.body.id
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
       res.status(404).json({ message: "Product not found"})
    }
    res.status(200).json({ message: "Product successfully deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}) 

// delete particular product.... using delete method
// app.delete("/api/products/delete_product/:id", async (req, res) => {
  // try {
  //   const { id } = req.params
  //   const product = await Product.findByIdAndDelete(id)
  //   if (!product) {
  //      res.status(404).json({ message: "Product not found"})
  //   } else {
  //     res.status(200).json({ message: "Product successfully deleted" }) 
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: error.message })
  // }
// })


mongoose
  .connect(
    "mongodb+srv://Chandru:851ODfbgTkqyIzxb@backenddb.b28r0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Database connected");
    app.listen(serverPort, () => {
      console.log(`Server listening on port: ${serverPort}`);
    });
  })

  .catch((error) => {
    console.log("Database not connected", error);
  });

const mongoose = require("mongoose");
const shortid = require("shortid");
require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
{}
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

const password = `syiHO5dPycnpU5rP`
const dbname = `react-shopping-cart-db`
const uri =  `mongodb+srv://react-shopping-cart-db:${password}@cluster0.rdl5d.mongodb.net/${dbname}?retryWrites=true&w=majority
`


mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,}
  )


const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);  
  }catch(error) {
     console.error(error)
  }
});  
 
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("  products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});




const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
app.delete("/api/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
}); 

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
app.delete("/api/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

const port = process.env.PORT;
app.listen(port, () => console.log("serve at http://localhost:5001"));
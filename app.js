const express = require("express");
const app = express();
app.set("view engine", "pug")
app.set("views","./views")
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const products = [
  {
    "name": "tv",
    "price": 2000,
    "brand": "xiaomi"
  },
  {
    "name": "Laptop",
    "price": 5000,
    "brand": "apple"
  }
]

const requestURLLogger = (req, res, next) => {
  console.log("url is:" + req.url)
  next();
}
app.use(requestURLLogger)
app.use(express.json())
app.get("/products/:brand", (req, res) => {
  const brand = req.params.brand
  console.log("用户请求的是"+brand)
  const product = products.filter(_product =>  _product.brand === brand)
  res.send(product)
});

app.get("/home", (req, res) => {
  res.render("home", {
    title: "home",
    message: "hello there"
  })  
});


app.post("/products", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const brand = req.body.brand;
  products.push({name, price, brand});
  res.json({
    "message": "New product created",
    "data": products
  })
});

const port = 3000
app.listen(port, () => {
  console.log("示例应用正在监听 3000 端口 111!");
});

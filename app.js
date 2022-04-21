const express = require('express');
const BuyerController = require('./controller/buyerController');
const SellerController = require('./controller/sellerController');
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

// route untuk buyer-side

app.get("/", BuyerController.home);
app.get("/:idCategory", BuyerController.produkByCategory);
app.get("/:idCategory/:id", BuyerController.produkByCategory);

// route untuk seller-side

app.get("/seller", SellerController.products);
app.get("/seller/login", SellerController.login);
app.get("/seller/register", SellerController.register);
app.get("/seller/categories", SellerController.categories);
app.get("/seller/orderlist", SellerController.orderList);
app.get("/seller/historytransactions", SellerController.historyTransactions);
app.get("/seller/products/add", SellerController.formAddProduct);
app.post("/seller/products/add", SellerController.addProduct);
app.get("/seller/products/edit/:id", SellerController.formEditProduct);
app.post("/seller/products/edit/:id", SellerController.updateProduct);
app.get("/seller/products/delete/:id", SellerController.deleteProduct);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
const express = require('express');
const BuyerController = require('./controller/buyerController');
const SellerController = require('./controller/sellerController');
const app = express()
const session = require('express-session');
const port = 3000

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'seller secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    sameSite: true
  }
}))
// route untuk buyer-side

// app.get("/", (req, res) => {
//   res.send('hello')
// });
// app.get("/:idCategory", BuyerController.produkByCategory);
// app.get("/:idCategory/:id", BuyerController.produkByCategory);

// // route untuk seller-side
app.get("/seller/login", SellerController.login);
app.post("/seller/login", SellerController.loginPost);

app.get("/seller/register", SellerController.register);
app.post("/seller/register", SellerController.registerPost);

app.use(function(req, res, next){
  if(!req.session.userId){
    const errors = 'Please login first'
    res.redirect(`/seller/login?error=${errors}`)
  }else{
    next();
  }
})

app.use(function(req, res, next){
  if(req.session.userId && req.session.role !== 'seller'){
    const errors = 'You have no acccess'
    res.redirect(`/seller/login?error=${errors}`)
  }else{
    next();
  }
})

app.get("/seller", SellerController.products);
app.get("/seller/logout", SellerController.logout)

app.get("/seller/categories", SellerController.categories);

app.get("/seller/orderlist", SellerController.orderList);

app.get("/seller/historytransactions", SellerController.historyTransactions);

app.get("/seller/categories/add", SellerController.formAddCategory);
app.post("/seller/categories/add", SellerController.addCategory)

app.get("/seller/products/add", SellerController.formAddProduct);
app.post("/seller/products/add", SellerController.addProduct);

app.get("/seller/orderlist/:transactionId", SellerController.processOrder);

app.get("/seller/products/edit/:id", SellerController.formEditProduct);
app.post("/seller/products/edit/:id", SellerController.updateProduct);
app.get("/seller/products/delete/:id", SellerController.deleteProduct);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
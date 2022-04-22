const sellerRouter = require('express').Router();
const SellerController = require('../controller/sellerController');

// // route untuk seller-side
sellerRouter.get("/login", SellerController.login);
sellerRouter.post("/login", SellerController.loginPost);

sellerRouter.get("/register", SellerController.register);
sellerRouter.post("/register", SellerController.registerPost);

sellerRouter.use(function(req, res, next){
  if(!req.session.userId){
    const errors = 'Please login first'
    res.redirect(`/seller/login?error=${errors}`)
  }else{
    next();
  }
})

sellerRouter.use(function(req, res, next){
  if(req.session.userId && req.session.role !== 'seller'){
    const errors = 'You have no acccess'
    res.redirect(`/seller/login?error=${errors}`)
  }else{
    next();
  }
})

sellerRouter.get("/", SellerController.products);
sellerRouter.get("/logout", SellerController.logout)

sellerRouter.get("/categories", SellerController.categories);

sellerRouter.get("/orderlist", SellerController.orderList);

sellerRouter.get("/historytransactions", SellerController.historyTransactions);

sellerRouter.get("/categories/add", SellerController.formAddCategory);
sellerRouter.post("/categories/add", SellerController.addCategory)

sellerRouter.get("/products/add", SellerController.formAddProduct);
sellerRouter.post("/products/add", SellerController.addProduct);

sellerRouter.get("/orderlist/:transactionId", SellerController.processOrder);

sellerRouter.get("/products/edit/:id", SellerController.formEditProduct);
sellerRouter.post("/products/edit/:id", SellerController.updateProduct);
sellerRouter.get("/products/delete/:id", SellerController.deleteProduct);

module.exports = sellerRouter;
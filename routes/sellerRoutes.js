const sellerRouter = require('express').Router();
const SellerController = require('../controller/sellerController');


sellerRouter.get("/", SellerController.products);
sellerRouter.get("/login", SellerController.login);
sellerRouter.get("/register", SellerController.register);
sellerRouter.get("/categories", SellerController.categories);
sellerRouter.get("/orderlist", SellerController.orderList);
sellerRouter.get("/historytransactions", SellerController.historyTransactions);
sellerRouter.post("/products/add", SellerController.addProduct);
sellerRouter.get("/products/edit/:id", SellerController.formEditProduct);
sellerRouter.post("/products/edit/:id", SellerController.updateProduct);
sellerRouter.get("/products/delete/:id", SellerController.deleteProduct);

module.exports = sellerRouter;
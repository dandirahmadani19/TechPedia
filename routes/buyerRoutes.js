const buyerRouter = require('express').Router();
const BuyerController = require('../controller/buyerController');

buyerRouter.get("/login", BuyerController.loginForm);
buyerRouter.post("/login", BuyerController.loginPost);

buyerRouter.get("/register", BuyerController.registerForm);
buyerRouter.post("/register", BuyerController.registerPost);

buyerRouter.use((req, res, next) => {
    console.log(req.session.userId)
    console.log(req.session.cart);
    if (req.session.userId) {
        next();
    } else {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`);
    }
});

buyerRouter.get("/", BuyerController.home);

buyerRouter.get("/cart", BuyerController.cart);
buyerRouter.get("/cart/add/:id", BuyerController.addItemToCart);
buyerRouter.get("/checkout", BuyerController.checkout);
buyerRouter.get("/historytransactions", BuyerController.historyTransaction);
buyerRouter.get("/logout", BuyerController.logout);
buyerRouter.get("/categories/:idCategory", BuyerController.produkByCategory);
buyerRouter.get("/categories/:idCategory/:id", BuyerController.detailProduk);

module.exports = buyerRouter;
const buyerRouter = require('express').Router();
const BuyerController = require('../controller/buyerController');

buyerRouter.get("/login", BuyerController.loginForm);
buyerRouter.post("/login", BuyerController.loginPost);

buyerRouter.get("/register", BuyerController.registerForm);
buyerRouter.post("/register", BuyerController.registerPost);

const cekLogin = (req, res, next) => {
    console.log(req.session.userId)
    console.log(req.session.cart);
    if (req.session.userId) {
        next();
    } else {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`);
    }
}

// buyerRouter.use((req, res, next) => {
    
// });

buyerRouter.get("/", cekLogin, BuyerController.home);

buyerRouter.get("/cart", cekLogin,BuyerController.cart);
buyerRouter.get("/cart/add/:id", cekLogin,BuyerController.addItemToCart);
buyerRouter.get("/checkout", cekLogin,BuyerController.checkout);
buyerRouter.get("/historytransactions",cekLogin, BuyerController.historyTransaction);
buyerRouter.get("/logout",cekLogin, BuyerController.logout);
buyerRouter.get("/categories/:idCategory",cekLogin, BuyerController.produkByCategory);
buyerRouter.get("/categories/:idCategory/:id", cekLogin,BuyerController.detailProduk);

module.exports = buyerRouter;
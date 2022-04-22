const { Product, Category, User } = require("../models");
const formatter = require("../helpers/formatter");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

class BuyerController {
    static loginForm(req, res) {
        res.render("./buyer/loginForm");
    }
    static loginPost(req, res) {
        const { email, password } = req.body;
        User.findOne({ where: { email } })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password);
                    if (isValidPassword) {
                        req.session.userId = user.id;
                        req.session.cart = [];
                        return res.redirect("/")
                    }
                     return res.redirect("/login?error=invalid password");
                } else {
                     return res.redirect("/login?error=invalid username");
                }
            }).catch(err => {
                res.send(err);
            })
    }
    static registerForm(req, res) {
        res.render("./buyer/registerForm");
    }
    static registerPost(req, res) {
        const { firstName, lastName, email, password, role } = req.body;
        User.create({ firstName, lastName, email, password, role })
            .then(() => {
                res.redirect("/login");
            }).catch(err => {
                res.send(err);
            })
    }
    static home(req, res) {
        const search = req.query.search;
        const option = { where : {} };
        !search ? 0 : option.where.name = { [Op.iLike]: `%${search}%` };
        let result = {};
        Product.findAll(option)
            .then(products => {
                result = products;
                return Category.findAll();
            }).then(categories => {
                res.render("./buyer/home", { products: result, categories , formatter});
            }).catch(err => {
                res.send(err);
            })
    }
    static produkByCategory(req, res) {
        const CategoryId = req.params.idCategory;
        let result = {};
        Product.findAll({ where: { CategoryId } })
            .then(products => {
                result = products;
                return Category.findAll();
            }).then(categories => {
                res.render("./buyer/home", { products: result, categories , formatter});
            }).catch(err => {
                res.send(err);
            })
    }
    static detailProduk(req, res) {
        const id = req.params.id;
        Product.detailProduk(+id)
            .then(products => {
                res.render("./buyer/detailProduct", { products , formatter});
            }).catch(err => {
                res.send(err);
            })
    }
    static addItemToCart(req, res) {
        const id = req.params.id;
        Product.findByPk(+id)
            .then(product => {
                const { id, name, price, imageUrl } = product;
                const quantity = 1;
                let flag = true;
                req.session.cart.forEach(e => {
                    if (id === e.id ) {
                        e.quantity+= 1
                        flag = false;
                    }
                });
                flag ? req.session.cart.push({ id, name, price, imageUrl, quantity }) : 0;
                res.redirect("/cart");
            }).catch(err => {
                res.send(err);
            })
    }
    static cart(req, res) {
        const cart = req.session.cart;
        res.render("./buyer/cart", {cart, formatter});
    }
    static checkout(req, res) {
        const CategoryId = req.params.idCategory;
        const id = req.params.id;
        res.send("Detail Produk");
    }
    static historyTransaction(req, res) {
        res.send("history transaksi")
    }
    static logout(req, res) {
        req.session.destroy();
        res.redirect("/login");
    }
    
}

module.exports = BuyerController;

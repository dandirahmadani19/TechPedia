const { Product, Category, User, Transaction } = require("../models/index");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

class SellerController {
  static login(req, res) {
    // res.send("Login");
    let errors = req.query.error;
    res.render("sellerLogin", {
      errors,
    });
  }

  static loginPost(req, res) {
    const { email, password } = req.body;
    // console.log(req.body)
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);

          if (isValidPassword) {
            req.session.userId = user.id;
            req.session.role = user.role;
            // console.log(req.session)
            return res.redirect("/seller");
          } else {
            const errors = "invalid email or password";
            return res.redirect(`/seller/login?error=${errors}`);
          }
        } else {
          const errors = "invalid email or password";
          return res.redirect(`/seller/login?error=${errors}`);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static register(req, res) {
    // res.send("register")
    res.render("sellerRegister");
  }

  static registerPost(req, res) {
    // console.log(req.body)
    const { firstName, lastName, email, password, role } = req.body;
    User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    })
      .then((_) => {
        res.redirect("/seller/login");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static products(req, res) {
    //    res.send("list produk");
    let where = {};
    if (req.query.search) {
      let search = req.query.search;
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }
    if (req.query.CategoryId) {
      let category = req.query.CategoryId;
      where.CategoryId = {
        [Op.eq]: `${category}`,
      };
    }
    let produk;
    Product.findAll({
      include: [Category],
      order: [["id", "ASC"]],
      where,
    })
      .then((product) => {
        produk = product;
        // console.log(produk[0].Category)
        return Category.findAll();
      })
      .then((category) => {
        res.render("sellerHome", {
          product: produk,
          category,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static categories(req, res) {
    // res.send("list category");
    Category.findAll()
      .then((category) => {
        res.render("sellerListCategory", {
          category,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static formAddCategory(req, res) {
    // res.send("form Add Produk");
    let errors = req.query.error;
    res.render("sellerFormAddCategory", {
      errors
    });
  }

  static addCategory(req, res) {
    // console.log(req.body)

    const { name } = req.body;
    Category.create({
      name,
    })
      .then((_) => {
        res.redirect("/seller/categories");
      })
      .catch((err) => {
         if(err.name === "SequelizeValidationError"){
          const errors = err.errors.map(el => {
            return el.message
          })  
          return res.redirect(`/seller/categories/add?error=${errors}`)
        }
        res.send(err);
      });
  }

  static formAddProduct(req, res) {
    // console.log(req.session.userId)
    let errors = req.query.error;
    Category.findAll()
      .then((category) => {
        res.render("sellerFormAddProduct", {
          category,
          errors
        });
      })
      .catch((err) => {
        
        res.send(err);
      });
  }

  static addProduct(req, res) {
    // res.send("post add produk");
    const { name, description, price, CategoryId, stock, brand, imageUrl } =
      req.body;
    const UserId = req.session.userId;
    Product.create({
      name,
      description,
      price,
      UserId,
      CategoryId,
      stock,
      brand,
      imageUrl,
    })
      .then((_) => {
        res.redirect("/seller");
      })
      .catch((err) => {
        if(err.name === "SequelizeValidationError"){
          const errors = err.errors.map(el => {
            return el.message
          })  
          return res.redirect(`/seller/products/add?error=${errors}`)
        }
        res.send(err);
      });
  }

  static formEditProduct(req, res) {
    // res.send("form Edit Produk");
    // console.log(req.params)
    let id = req.params.id;
    let produk;
    let errors = req.query.error;
    Product.findOne({
      where: {
        id: id,
      },
    })
      .then((product) => {
        produk = product;
        return Category.findAll();
      })
      .then((category) => {
        res.render("sellerFormEditProduct", {
          product: produk,
          category,
          errors
        });
      })
      .catch((err) => {
        // res.send(err);
        res.send(err)
      });
  }
  static updateProduct(req, res) {
    // res.send("post update produk");
    // console.log(req.body)
    let id = req.params.id;
    const { name, description, price, CategoryId, stock, brand, imageUrl } =
      req.body;
    const UserId = req.session.userId;
    Product.update(
      {
        name,
        description,
        price,
        UserId,
        CategoryId,
        stock,
        brand,
        imageUrl,
      },
      { where: { id: id } }
    )
      .then((_) => {
        res.redirect("/seller");
      })
      .catch((err) => {
        if(err.name === "SequelizeValidationError"){
          const errors = err.errors.map(el => {
            return el.message
          })  
          return res.redirect(`/seller/products/edit/${id}?error=${errors}`)
        }
        res.send(err)
      });
  }
  static orderList(req, res) {
    // res.send("tampilin data transaksi yang statusny pending");
    Transaction.findAll({
      include: [Product, User],
    })
      .then((transaction) => {
        // res.send(transaction)
        res.render("sellerOrderList", {
          transaction,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static processOrder(req, res) {
    // console.log(req.params)
    let id = req.params.transactionId;
    Transaction.update(
      {
        status: "done",
      },
      {
        where: { id: id },
      }
    )
      .then((_) => {
        return Transaction.findOne({
          include: [Product],
          where: {
            id: id,
          },
        });
      })
      .then(transaction => {
          console.log(transaction)
          return Product.decrement(
          {
              stock: +transaction.Products[0].TransactionItem.quantity
          },
          {
              where: {
                  id: transaction.Products[0].id
              }
          })
      })
      .then((_) => {
        res.redirect("/seller");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static historyTransactions(req, res) {
    // res.send("History transaksi");
  }
  static deleteProduct(req, res) {
    // res.send("Hapus Transaksi");
    let id = req.params.id;
    Product.destroy({
      where: {
        id: id,
      },
    })
      .then((_) => {
        res.redirect("/seller");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static logout(req, res) {
    // res.redirect("/seller/login");
    req.session.destroy((err) => {
      if (err) {
        // console.log(err)
        res.send(err);
      } else {
        res.redirect("/seller/login");
      }
    });
  }
}

module.exports = SellerController;

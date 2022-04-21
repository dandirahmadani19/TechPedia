class SellerController {
    static login(req, res) {
        res.send("Login");
    }
    static register(req, res) {
        res.send("register");
    }
    static products(req, res) {
       res.send("list produk");
    }
    static categories(req, res) {
        res.send("list category");
    }
    static formAddProduct(req, res) {
        res.send("form Add Produk");
    }
    static addProduct(req, res) {
        res.send("post add produk");
    }
    static formEditProduct(req, res) {
        res.send("form Edit Produk");
    }
    static updateProduct(req, res) {
        res.send("post update produk");
    }
    static formEditProduct(req, res) {
        res.send("form Edit Produk");
    }
    static orderList(req, res) {
        res.send("tampilin data transaksi yang statusny pending");
    }
    static historyTransactions(req, res) {
        res.send("History transaksi");
    }
    static deleteProduct(req, res) {
        res.send("Hapus Transaksi");
    }
    static logout(req, res) {
        res.redirect("/seller/login")
    }
}

module.exports = SellerController;
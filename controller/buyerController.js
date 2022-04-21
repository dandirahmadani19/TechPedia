
class BuyerController {
    static home(req, res) {
        res.send("Home");
    }
    static produkByCategory(req, res) {
        const CategoryId = req.params.idCategory;
        res.send("produk by category id");
    }
    static detailProduk(req, res) {
        const CategoryId = req.params.idCategory;
        const id = req.params.id;
        res.send("Detail Produk");
    }
    static cart(req, res) {
        res.send("Cart Produk");
    }
    static checkout(req, res) {
        const CategoryId = req.params.idCategory;
        const id = req.params.id;
        res.send("Detail Produk");
    }
    
}

module.exports = BuyerController;
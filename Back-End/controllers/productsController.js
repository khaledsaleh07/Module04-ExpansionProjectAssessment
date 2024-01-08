import Product from "../models/Product";

// Get all products
const getProducts = async (req, res) => {
  try {
    const users = await Product.findAll({ order: [["id", "DESC"]] });
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (Product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// add a product
const addProduct = async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await Product.create(product);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.errors[0].message);
      }
}

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Product.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(204).json({ message: "product deleted successfully" });
      } else {
        res.status(404).json({ error: "product not found" });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
};

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
      const product = await Product.findByPk(id);
      if (product) {
        Object.assign(product, updatedFields);
        await product.save();
        res.json(product);
      } else {
        res.status(404).json({ error: "product not found" });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
};

export {
    getProducts,
    updateProduct,
    deleteProduct,
    addProduct,
    getProductById,
}
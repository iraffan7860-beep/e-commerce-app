import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Name, price and category are required"
      });
    }

    const product = await Product.create({
      name,
      price,
      category,
      image,
      description
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.log("Create product error:", error.message);

    res.status(500).json({
      message: "Failed to create product"
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i"
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    console.log("Get products error:", error.message);

    res.status(500).json({
      message: "Failed to get products"
    });
  }
};

// Get One Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    console.log("Get product error:", error.message);

    res.status(500).json({
      message: "Failed to get product"
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    console.log("Update product error:", error.message);

    res.status(500).json({
      message: "Failed to update product"
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.log("Delete product error:", error.message);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
};

// Import Products from API
export const importProducts = async (req, res) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/products"
    );

    const data = await response.json();

    const products = data.products.map((item) => ({
      name: item.title,
      price: item.price,
      category: item.category,
      image: item.images[0],
      description: item.description
    }));

    await Product.insertMany(products);

    res.json({
      message: "Products imported successfully",
      count: products.length
    });

  } catch (error) {
    console.log("Import products error:", error.message);

    res.status(500).json({
      message: "Failed to import products"
    });
  }
};
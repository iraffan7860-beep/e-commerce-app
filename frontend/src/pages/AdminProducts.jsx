import { useEffect, useState } from "react";
import apiFetch from "../api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  const [editId, setEditId] = useState(null);

  const getProducts = async () => {
    try {
      const response = await apiFetch("/api/products");
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getContactMessages = async () => {
    try {
      const response = await apiFetch("/api/contact");
      const data = await response.json();

      if (response.ok) {
        setContactMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getContactMessages();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Import Products
  const importProducts = async () => {
    try {
      const response = await apiFetch(
        "/api/products/import-api",
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(`${data.count} products imported successfully`);

      getProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to import products");
    }
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product added successfully");

      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        description: ""
      });

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Product
  const editProduct = (product) => {
    setEditId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || "",
      description: product.description || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Update Product
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch(
        `/api/products/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product updated successfully");

      setEditId(null);

      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        description: ""
      });

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await apiFetch(
        `/api/products/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product deleted");

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);

    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    });
  };

  return (
    <div className="admin-page">

      {/* Header */}
      <div className="admin-header">

        <div>
          <p className="admin-small-title">
            ADMIN PANEL
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your store products from here.
          </p>
        </div>

        <button
          onClick={importProducts}
          className="main-button"
        >
          📥 Import Products
        </button>

      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="dashboard-icon">
            📦
          </div>

          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">
            ➕
          </div>

          <div>
            <p>Add Product</p>
            <h2>New</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">
            ✏️
          </div>

          <div>
            <p>Manage</p>
            <h2>Edit</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">
            🛒
          </div>

          <div>
            <p>Store</p>
            <h2>Active</h2>
          </div>
        </div>

      </div>

      {/* Add Product Form */}
      <div className="admin-section">

        <h2>
          {editId
            ? "✏️ Update Product"
            : "➕ Add New Product"}
        </h2>

        <form
          onSubmit={
            editId
              ? updateProduct
              : addProduct
          }
          className="admin-form"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="form-buttons">

            <button
              type="submit"
              className="main-button"
            >
              {editId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="back-button"
              >
                Cancel Edit
              </button>
            )}

          </div>

        </form>

      </div>

      {/* Products Section */}
      <div className="admin-section">

        <div className="products-heading">

          <div>
            <h2>📋 All Products</h2>

            <p>
              {products.length} products available
            </p>
          </div>

        </div>

        <div className="admin-products">

          {products.map((product) => (

            <div
              className="admin-product-card"
              key={product._id}
            >

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="admin-product-image"
                />
              )}

              <div className="product-info">

                <h3>
                  {product.name}
                </h3>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {product.category}
                </p>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <p className="product-description">
                  {product.description}
                </p>

              </div>

              <div className="admin-buttons">

                <button
                  onClick={() =>
                    editProduct(product)
                  }
                  className="edit-button"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  className="remove-button"
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Contact Messages */}
      <div className="admin-section">

        <div className="products-heading">

          <div>
            <h2>📩 Contact Messages</h2>

            <p>
              {contactMessages.length} messages received
            </p>
          </div>

        </div>

        {contactMessages.length === 0 ? (

          <p>
            No contact messages yet.
          </p>

        ) : (

          <div className="admin-products">

            {contactMessages.map((contact) => (

              <div
                className="admin-product-card"
                key={contact._id}
              >

                <div className="product-info">

                  <h3>
                    {contact.name}
                  </h3>

                  <p>
                    <strong>Email:</strong>{" "}
                    {contact.email}
                  </p>

                  <p className="product-description">
                    <strong>Message:</strong>{" "}
                    {contact.message}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      contact.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminProducts;
import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com/api/products"
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
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

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://e-commerce-app-v9zz.onrender.com/api/products/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
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

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-v9zz.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token
          }
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
      <h1>Admin Products</h1>

      <form
        onSubmit={editId ? updateProduct : addProduct}
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

        <button type="submit" className="main-button">
          {editId ? "Update Product" : "Add Product"}
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
      </form>

      <h2>All Products</h2>

      <div className="admin-products">
        {products.map((product) => (
          <div
            className="admin-product-card"
            key={product._id}
          >
            <h3>{product.name}</h3>

            <p>Category: {product.category}</p>

            <p>Price: ₹{product.price}</p>

             <div className="admin-buttons">
  <button
    onClick={() => editProduct(product)}
    className="edit-button"
  >
    Edit
  </button>

  <button
    onClick={() => deleteProduct(product._id)}
    className="remove-button"
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/ProductService.js";
import "../App.css";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      setError("Name, price, and category are required.");
      return;
    }

    const newProduct = { name, price, category, stock };

    try {
      if (editing) {
        await updateProduct(editingProductId, newProduct);
      } else {
        await createProduct(newProduct);
      }

      resetForm();
      loadProducts();
    } catch (err) {
      setError("Error saving product.");
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setEditing(true);
    setEditingProductId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      setError("Error deleting product.");
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setStock(0);
    setEditing(false);
    setEditingProductId(null);
    setError(null);
  };

  return (
    <div className="product-page">
      <h1 style={{ color: "#3cacae" }}>
        {editing ? "Edit Product" : "Create New Product"}
      </h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: "#3cacae", color: "white" }}
        >
          {editing ? "Update Product" : "Create Product"}
        </button>
      </form>

      <h2 style={{ color: "#3cacae" }}>Product List</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <span>{product.name}</span> - <span>${product.price}</span> -{" "}
            <span>{product.category}</span> - <span>{product.stock}</span>
            <button
              className="edit-btn"
              onClick={() => handleEdit(product)}
              style={{ backgroundColor: "#3cacae", color: "white" }}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(product._id)}
              style={{ backgroundColor: "#e74c3c", color: "white" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;

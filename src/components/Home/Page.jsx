import React from "react";
import "./Home.css";

const Home = ({ product, handleChange, handleSubmit, editId }) => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card form-card shadow-lg p-5 rounded-4 w-50">
        <h3 className="text-center mb-4 text-purple">
          {editId ? "Edit Product" : "Add Product"}
        </h3>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group mb-3">
            <label>Product Name</label>
            <input
              type="text"
              name="pname"
              value={product.pname || ""}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Quantity</label>
            <input
              type="number"
              name="qty"
              value={product.qty || ""}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </div>

          <button type="submit" className="btn-submit btn-lg w-100 mt-4">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import "./ViewUser.css";

const Page = ({
  currentItems,
  currentPage,
  totalPage,
  setCurrentPage,
  handleDelete,
  handleEdit,
  handleSort,
}) => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Product List</h3>
        <div className="d-flex gap-2">
          <select
            className="form-select border-primary text-purple fw-bold"
            style={{ minWidth: "150px" }}
            onChange={(e) => handleSort(e.target.value, "asc")}
          >
            <option value="pname">Name Asc</option>
            <option value="category">Category Asc</option>
            <option value="price">Price Asc</option>
            <option value="qty">Quantity Asc</option>
          </select>
          <select
            className="form-select border-primary text-purple fw-bold"
            style={{ minWidth: "150px" }}
            onChange={(e) => handleSort(e.target.value, "desc")}
          >
            <option value="pname">Name Desc</option>
            <option value="category">Category Desc</option>
            <option value="price">Price Desc</option>
            <option value="qty">Quantity Desc</option>
          </select>
        </div>
      </div>
      <div className="card custom-card">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.pname}</td>
                    <td>{item.category}</td>
                    <td>₹{item.price}</td>
                    <td>{item.qty}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
            </li>
            {[...Array(totalPage)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPage ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Page;

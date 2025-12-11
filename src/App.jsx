import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home/Page";
import ViewData from "./components/Abouts/Page";
import Header from "./components/Header";

const App = () => {
  const [product, setProduct] = useState({});
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("list")) || [];
    setList(data);
    setDisplayList(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    setDisplayList(list);
  }, [list]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const updatedList = list.map((item) =>
        item.id === editId ? { ...item, ...product } : item
      );
      setList(updatedList);
      setEditId(null);
       navigate('/viewdata');
    } else {
      setList([...list, { id: Date.now(), ...product }]);
      navigate("/viewdata");
    }
    setProduct({});
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const data = list.find((item) => item.id === id);
    setProduct(data);
    setEditId(id);
    navigate("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = list.filter(
      (item) =>
        item.pname.toLowerCase().includes(value) ||
        (item.category && item.category.toLowerCase().includes(value))
    );
    setDisplayList(filtered);
    setCurrentPage(1);
  };

  const handleSort = (column, order) => {
    const sorted = [...displayList].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (typeof valA === "string") {
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return order === "asc" ? valA - valB : valB - valA;
      }
    });
    setDisplayList(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(displayList.length / itemsPerPage);

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route
          index
          element={
            <Home
              product={product}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editId={editId}
            />
          }
        />
        <Route
          path="/viewdata"
          element={
            <ViewData
              currentItems={currentItems}
              currentPage={currentPage}
              totalPage={totalPage}
              setCurrentPage={setCurrentPage}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleSort={handleSort}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home/Page";
import ViewData from "./components/Abouts/Page";
import Header from "./components/Header";
import Login from "./components/utils/Login";
import Signup from "./components/utils/Signup";

const App = () => {
  const [product, setProduct] = useState({});
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("list")) || [];
    setList(storedList);
    setDisplayList(storedList);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const storedLogin = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    setIsLoggedIn(storedLogin);
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const updatedList = list.map((item) =>
        item.id === editId ? { ...item, ...product } : item
      );
      setList(updatedList);
      setEditId(null);
      navigate("/viewdata");
    } else {
      setList([...list, { id: Date.now(), ...product }]);
      navigate("/viewdata");
    }
    setProduct({});
  };

  const handleDelete = (id) => setList(list.filter((item) => item.id !== id));

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
      if (typeof valA === "string") return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return order === "asc" ? valA - valB : valB - valA;
    });
    setDisplayList(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayList.slice(indexOfFirstItem, indexOfLastItem);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      setIsLoggedIn(true);
      setLoginData({ email: "", password: "" });
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = signupData;
    if (!username || !email || !password || !confirmPassword) return alert("All fields are required");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (users.find(u => u.email === email)) return alert("User already exists");

    const newUsers = [...users, { username, email, password }];
    setUsers(newUsers);
    setSignupData({ username: "", email: "", password: "", confirmPassword: "" });
    navigate("/login");
  };

  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header handleSearch={handleSearch} handleLogout={handleLogout} />
          <Routes>
            <Route index element={<Home product={product} handleChange={handleChange} handleSubmit={handleSubmit} editId={editId} />} />
            <Route path="/viewdata" element={<ViewData currentItems={currentItems} currentPage={currentPage} totalPage={Math.ceil(displayList.length / itemsPerPage)} setCurrentPage={setCurrentPage} handleDelete={handleDelete} handleEdit={handleEdit} handleSort={handleSort} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route index element={<Login loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup signupData={signupData} setSignupData={setSignupData} handleSignup={handleSignup} />} />
        </Routes>
      )}
    </>
  );
};

export default App;

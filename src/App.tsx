import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post</Link>
        </li>
        <li>
          <Link to="/posts/:id">PostInfo</Link>
        </li>
        <li>
          <Link to="/posts/new">NewPost</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Edit</Link>
        </li>
        <li>
          <Link to="/posts/profile">Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route path="/posts" element={<h1>post list page</h1>}></Route>
        <Route path="/posts/:id" element={<h1>Post Info Page</h1>}></Route>
        <Route path="/posts/new" element={<h1>New Post</h1>}></Route>
        <Route path="/posts/edit/:id" element={<h1>Edit Post</h1>}></Route>
        <Route path="/posts/profile" element={<h1>Profile</h1>}></Route>
        <Route path="*" element={<Navigate replace to="/" />}></Route>
      </Routes>
    </>
  );
}

export default App;

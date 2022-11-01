import React from 'react';
import {  Routes, Link, Route } from 'react-router-dom';
import PostBlock from './componens/Articles/Articles';
import Photos from './componens/Photos/Photos';
import Users from './componens/Users/Users';
import "./App.css"
import HomeLink from './componens/HomeLink/HomeLink';

export default function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/user">Users</Link>
        <Link to="/photos">Photos</Link>
      </header>

      <Routes>
        <Route path='/' element={<PostBlock/>}/>
        <Route path='/user' element={<Users/>}/>
        <Route path='/photos' element={<Photos/>}/>
        <Route path='*' element={<HomeLink/>}/>
      </Routes>
    </>
  )
}

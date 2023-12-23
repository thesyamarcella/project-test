// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import './App.css';

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    setIsHeaderVisible(scrolled <= 0 || scrolled < window.innerHeight);
  };

  // Pasang event listener untuk scroll
  window.addEventListener('scroll', handleScroll);

  return (
    <header className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      <div className="header-content">
        <div className="logo">
          <img src="path/to/your/logo.png" alt="Logo" />
        </div>
        <nav className="menu">
          <NavLink to="/" end activeClassName="active">
            Work
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/service" activeClassName="active">
            Service
          </NavLink>
          <NavLink to="/ideas" activeClassName="active">
            Ideas
          </NavLink>
          <NavLink to="/careers" activeClassName="active">
            Careers
          </NavLink>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

const Banner = () => {
  return (
    <section className="banner">
      <img
        src="https://via.placeholder.com/1200x200"
        alt="Banner Image"
        className="banner-image"
      />
      <div className="banner-text">
        <h2>Welcome to My Website</h2>
        <p>This is a simple React page with a header, banner, and list of posts.</p>
      </div>
    </section>
  );
};

const ListPost = () => {
  // Mock data for posts
  const posts = [
    { id: 1, title: 'Post 1', content: 'This is the content of post 1.' },
    { id: 2, title: 'Post 2', content: 'This is the content of post 2.' },
    { id: 3, title: 'Post 3', content: 'This is the content of post 3.' },
    // ... add more posts
  ];

  return (
    <section className="list-post">
      <h2>Latest Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <img src={`https://via.placeholder.com/100x100?text=${post.id}`} alt="Post Thumbnail" />
            <div className="post-details">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/service" element={<div>Service Page</div>} />
          <Route path="/ideas" element={<div>Ideas Page</div>} />
          <Route path="/careers" element={<div>Careers Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
        <ListPost />
      </div>
    </Router>
  );
}

export default App;

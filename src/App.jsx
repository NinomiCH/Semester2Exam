// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import GitHubRepos from "./GitHubRepos";
import SingleRepo from "./SingleRepo";
import TestComponentWithError from "./TestComponentWithError";
import NotFoundPage from "./NotFoundPage";
import "./Style.css"; 

function App() {
  return (
    <Router>
      <div className="container" >
        <header className="header">
          <h1>My React App</h1>
          <img src="" alt="" />
        </header>
        <nav className="navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<GitHubRepos />} />
            <Route path="/repo/:repoId" element={<SingleRepo />} />
            <Route path="/test-error" element={<TestComponentWithError />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
        <footer className="footer">
          <p>&copy; 2024 My React App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

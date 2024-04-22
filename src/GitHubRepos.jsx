import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRepoData, setNewRepoData] = useState({ name: "", description: "" });

  const perPage = 10;

  useEffect(() => {
    fetchRepos();
  }, [page, search]);

  const fetchRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/user/repos`, {
        params: {
          per_page: perPage,
          page: page,
          sort: "updated",
          q: search,
        },
        headers: {
          Authorization: `Bearer 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`,
        },
      });
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleSearch = () => {
    setPage(1); 
    fetchRepos();
  };

  const handleCreateRepo = async () => {
    try {
      await axios.post(`https://api.github.com/user/repos`, newRepoData, {
        headers: {
          Authorization: `Bearer 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`,
        },
      });
      setNewRepoData({ name: "", description: "" });
      setShowCreateModal(false);
      fetchRepos();
    } catch (error) {
      console.error("Error creating repository:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRepoData({ ...newRepoData, [name]: value });
  };

  const handleDeleteRepo = async (repoId) => {
    try {
      await axios.delete(`https://api.github.com/repos/${repoId}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      });
      fetchRepos();
    } catch (error) {
      console.error("Error deleting repository:", error);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <h1>My GitHub Repositories</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setShowCreateModal(true)}>
        Create Repository
      </button>
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreateModal(false)}>
              &times;
            </span>
            <h2>Create New Repository</h2>
            <input
              type="text"
              name="name"
              placeholder="Repository Name"
              value={newRepoData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newRepoData.description}
              onChange={handleInputChange}
            />
            <button onClick={handleCreateRepo}>Create</button>
          </div>
        </div>
      )}

      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <Link to={`/repo/${repo.name}`}>{repo.full_name}</Link>
            <button onClick={() => handleDeleteRepo(repo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button disabled={page === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default GitHubRepos;

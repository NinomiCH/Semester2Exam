import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleRepo = () => {
    // Extract the `repoId` parameter from the URL using useParams
    const { repoId } = useParams();
    const [repo, setRepo] = useState(null);

    useEffect(() => {
        const fetchRepo = async () => {
            try {
                // Use `repoId` in the API request URL to fetch the specific repository
                const response = await axios.get(
                    `https://api.github.com/repos/${repoId}`
                );
                setRepo(response.data);
            } catch (error) {
                console.error("Error fetching repository:", error);
            }
        };
        fetchRepo();
    }, [repoId]);

    if (!repo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{repo.full_name}</h2>
            <p>{repo.description}</p>
            <p>Language: {repo.language}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
            {/* Add more repo details as needed */}
        </div>
    );
};

export default SingleRepo;

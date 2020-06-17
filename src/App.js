import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'; 

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const repo = {
      title: `Novo repositorio ${Date.now()}`,
      url: `http://http://www.github.com/dtrusman/newrepo`,
      techs: ['JS', 'TS', 'React', 'React Native']
    }

    const { data } = await api.post('repositories', repo);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const repoIndex = repositories.findIndex(repo => repo.id === id);
      if (repoIndex >= 0) {
        const _repositories = Array.from(repositories);
        _repositories.splice(repoIndex, 1);
        setRepositories(_repositories);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

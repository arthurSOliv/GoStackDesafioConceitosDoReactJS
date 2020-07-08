import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
      api.get('/repositories').then(response => {
        setRepositories(response.data);
      })
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositorio${Date.now()}`,
      url: `www.github.com/repositorio${Date.now()}`,
      techs: [
        'Node',
        'React'
      ]
    })

    const repositorie = response.data;
    

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const remainRepositories = repositories.filter((repository) => repository.id !== id)

    setRepositories(remainRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => 
          <li key={repositorie.id}>
            <h3>{repositorie.title}</h3>
            <a href={repositorie.url}><h5>{repositorie.url}</h5></a>
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

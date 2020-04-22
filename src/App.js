import React, {useState, useEffect } from 'react';
import './app.css';
import api from './services/api'

export default function App() {

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post('projects', { title, owner })
    
    setProjects([...projects, response.data]);
    setTitle('');
    setOwner('');
  } 

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)}/>
        <button type="submit"> Salvar </button>
      </form>
      <ul>
        {
          projects.map(project => (
            <li key={project.id}>
              <p>
                <strong>{project.title}</strong>
              </p>
              <span>{project.owner}</span>
            </li>
          ))
        }
      </ul>
    </>
  )
}
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
// npm install --save-dev @iconify/react @iconify/icons-logos
import { Icon } from '@iconify/react';
import swaggerIcon from '@iconify/icons-logos/swagger';


export default function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const linkSwagger = `${process.env.REACT_APP_BASE_APP_URL}/api-docs`;
  const sizeSwagger = '1.2rem';
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id, password });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      localStorage.setItem('token', response.data.token);
      
      history.push('/profile')
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Logon please</h1>
          <input
            type="text"
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Submit
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"></FiLogIn>
            I do not have an ID
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
      <footer>
        <h3>Interactive API documentation</h3>
        <div className="swagger-line">
        <Icon icon={swaggerIcon} width={sizeSwagger} height={sizeSwagger} />
        <a href={linkSwagger}>Swagger</a>
        </div>
        
      </footer>
    </div>
  );
}

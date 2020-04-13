import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.scss';

import api from '../../services/api'
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewIncident() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleSubmit(e) 
  {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      history.push('/profile')
    } catch (error) {
      alert('There was an error creating a new incident');
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content row">
        <section className="col-sm-12 col-md-4">
          <img src={logoImg} alt="Be The Hero" />
          <h1>Create a new incident</h1>
          <p>
            Describe the incident with details to help you find a hero.
          </p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Go back
          </Link>
        </section>
        <form className="col-sm-12 col-md-8" onSubmit={handleSubmit}>
          <input type="text"
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Incident Title" />
          <textarea
            value={description}
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description" />
          <input type="text"
            value={value}
            className="form-control"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Amount USD" />
          <button className="btn hero-button" type="submit">
            Create new Incident
          </button>
        </form>
      </div>
    </div>
  );
}

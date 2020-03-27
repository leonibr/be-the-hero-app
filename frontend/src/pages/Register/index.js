import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('ongs', data);
      alert(`Your access ID: ${response.data.id}`);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Registration</h1>
          <p>
            Register your Organization, enter and help your incidents to find heroes.
          </p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Go Back
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Organization"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

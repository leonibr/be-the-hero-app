import React, { useEffect, useState } from 'react';

import './style.scss';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([
  //   {
  //   id: 1,
  //   title: 'título 01',
  //   description: 'Deads fa;lsd fl;asdfl;asdl;fjlajsd fl; as;dlfa;lsd fjla',
  //   value: '120'
  // },
  // {
  //   id: 2,
  //   title: 'título 02',
  //   description: 'Deads fa;lsd fl;asdfl;asdl;fjlajsd fl; as;dlfa;lsd fjla',
  //   value: '120'
  // },
  // {
  //   id: 3,
  //   title: 'título 03',
  //   description: 'Deads fa;lsd fl;asdfl;asdl;fjlajsd fl; as;dlfa;lsd fjla',
  //   value: '120'
  // },
  // {
  //   id: 4,
  //   title: 'título 04',
  //   description: 'Deads fa;lsd fl;asdfl;asdl;fjlajsd fl; as;dlfa;lsd fjla',
  //   value: '120'
  // }
]);
  const ongName = localStorage.getItem('ongName');
  const token = localStorage.getItem('token');

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
         setIncidents(response.data);
      });
  }, [token]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('The was an error trying to delete the incident');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }
  
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Welcome, {ongName}</span>
        <Link className="btn hero-button" to="/incidents/new">
          Create new Incident
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={16} color="#E02041" />
        </button>
      </header>
      <h1>Existing Incidents</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>
            <strong>AMOUNT:</strong>
            <p>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(incident.value)}
            </p>
            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

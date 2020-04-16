import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ModalDialog from '../../components/ModalDialog';
import api from '../../services/api';
import './styles.scss';

import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import FormErrors from '../../components/FormErrors';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalTitle: '',
      modalSubTitle: '',
      modalDescriptions: [],
      name: '',
      email: '',
      password: '',
      whatsapp: '',
      city: '',
      uf: '',
      errors: {
        name: '',
        email: '',
        password: '',
        whatsapp: '',
        city: '',
        uf: '',
      },
      validForm: false,
      validName: false,
      validPassword: false,
      validEmail: false,
      validWhatsapp: false,
      validCity: false,
      validUf: false,
    };
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(`${name}: ${value}`);
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  setModalShow = (newValue) => {
    this.setState({
      modalShow: newValue,
    });
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.errors;
    let validName = this.state.validName;
    let validPassword = this.state.validPassword;
    let validEmail = this.state.validEmail;
    let validWhatsapp = this.state.validWhatsapp;
    let validCity = this.state.validCity;
    let validUf = this.state.validUf;

    switch (fieldName) {
      case 'name':
        validName = value !== null && value.length >= 4;
        fieldValidationErrors.name = validName ? '' : ' is invalid';
        break;
      case 'email':
        validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = validEmail ? '' : ' is invalid';
        break;
      case 'password':
        validPassword = value.length >= 4;
        fieldValidationErrors.password = validPassword ? '' : ' is too short';
        break;
      case 'whatsapp':
        validWhatsapp = value.length === 10 && !isNaN(new Number(value));
        fieldValidationErrors.whatsapp = validWhatsapp
          ? ''
          : ' needs exactly 10 numbers';
      case 'city':
        validCity = value !== null && value.length >= 3;
        fieldValidationErrors.city = validCity ? '' : ' is required';
      case 'uf':
        validUf = false;
        switch (true) {
          case (value === null || value === undefined):
            fieldValidationErrors.uf = ' is required';
            break;
          case (value.length === 0):
            fieldValidationErrors.uf = ' can not be empty.';
            break;
          case (value.length === 1):
            fieldValidationErrors.uf = ' is missing one letter.';
            break;
          case (value.length > 2):
            fieldValidationErrors.uf = ' needs to be informed with exactly 2 letters';
            break;
          default:
            validUf = true;
            fieldValidationErrors.uf = '';
            break;
        }

      default:
        break;
    }
    this.setState(
      {
        errors: fieldValidationErrors,
        validName,
        validEmail,
        validPassword,
        validWhatsapp,
        validCity,
        validUf,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      validForm:
        this.state.validName &&
        this.state.validPassword &&
        this.state.validEmail &&
        this.state.validWhatsapp &&
        this.state.validCity &&
        this.state.validUf,
    });
  }

  handleRegister= async(e) => {
    const { history } = this.props;
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      whatsapp: this.state.whatsapp,
      city: this.state.city,
      uf: this.state.uf,
      password: this.state.password,
    };

    try {
      const response = await api.post('ongs', data);
      this.setModalText({
        modalTitle: 'Register',
        modalSubTitle: 'Information stored.',
        modalDescriptions: [
          'Your data has ben recorded',
          'You will be placed at your profile page.',
          'Here you \'Cretate new Incidents\'',
        ],
      });
      alert(`Your access ID: ${response.data.id}`);
      history.push('/');
    } catch (error) {
      this.setModalText({
        modalTitle: 'Register Error',
        modalSubTitle: 'Please check your info.',
        modalDescriptions: [
          'Verify your data before submit again.',          
        ],
      });
      console.error('ERROR> ', error);
    } finally {
      this.setModalShow(true);
    }
  }

  setModalText = ({ modalTitle, modalSubTitle, modalDescriptions }) => {
    this.setState({
      modalTitle, modalSubTitle, modalDescriptions });
  };

  
  render() {
    return (
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1>Registration</h1>
            <p>
              Register your Organization, enter and help your incidents to find
              heroes.
            </p>
            <Link to="/" className="back-link">
              <FiArrowLeft size={16} color="#e02041" />
              Go Back
            </Link>
          </section>
          <form onSubmit={this.handleRegister}>
            <FormErrors errors={this.state.errors} />
            <input
              placeholder="Organization"
              value={this.state.name}
              name="name"
              className="form-control"
              onChange={(e) => this.handleUserInput(e)}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={(e) => this.handleUserInput(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={this.state.email}
              onChange={(e) => this.handleUserInput(e)}
            />
            <input
              type="text"
              placeholder="WhatsApp"
              className="form-control"
              value={this.state.whatsapp}
              name="whatsapp"
              onChange={(e) => this.handleUserInput(e)}
            />

            <div className="d-flex">
              <input
                type="text"
                placeholder="City"
                className="form-control"
                name="city"
                value={this.state.city}
                onChange={(e) => this.handleUserInput(e)}
              />
              <input
                type="text"
                placeholder="State"
                value={this.state.uf}
                name="uf"
                className="form-control format-state ml-2"
                onChange={(e) => this.handleUserInput(e)}
              />
            </div>

            <button className="btn hero-button" type="submit">
              Register
            </button>
          </form>
        </div>
        <ModalDialog
          show={this.state.modalShow}
          maintitle={this.state.modalTitle}
          subtitle={this.state.modalSubTitle}
          descriptions={this.state.modalDescriptions}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    );
  }
}

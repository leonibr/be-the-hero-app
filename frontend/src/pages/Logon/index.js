import React, { useState, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import './styles.scss';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
// npm install --save-dev @iconify/react @iconify/icons-logos
import { Icon } from '@iconify/react';
import swaggerIcon from '@iconify/icons-logos/swagger';
import FormErrors from '../../components/FormErrors';

export default class Logon extends Component {
  // const history = useHistory();
  // const [id, setId] = useState('');
  ///let [password, setPassword] = useState('');
  
  linkSwagger = `${process.env.REACT_APP_BASE_APP_URL}/api-docs`;
  sizeSwagger = 24;
  constructor(props) {
    super(props);
    this.sizeSwagger = '1.2rem';
    this.state = {
      id: '',
      password: '',
      errors: {
        id: '',
        password: '',
      },
      validForm: false,
      validId: false,
      validPassword: false,
    };
  }

  handleUserInput(e) {
    console.log(e.target.name + ' ' + e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },() => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.errors;
    let validId = this.state.validId;
    let validPassword = this.state.validPassword;

    switch (fieldName) {
      case 'id':
        validId = value !== null && value.length >= 4;
        fieldValidationErrors.id = validId ? '' : ' is invalid';
        break;
      case 'password':
        validPassword = value.length >= 4;
        fieldValidationErrors.password = validPassword ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        errors: fieldValidationErrors,
        validId: validId,
        validPassword: validPassword,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      validForm: this.state.validId && this.state.validPassword,
    });
  }

  async handleLogin(e) {
    const { history } = this.props;
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id: this.state.id, password: this.state.password });

      localStorage.setItem('ongId', this.state.id);
      localStorage.setItem('ongName', response.data.name);
      localStorage.setItem('token', response.data.token);

      history.push('/profile');
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  }


  render() {
    return (
      <div className="logon-container d-flex align-items-center justify-content-center">
        <div className="d-flex-column">
          <div className="d-flex">
            <section className="col-sm-12 col-md-4 form">
              <img src={logoImg} alt="Be The Hero" />
              <form onSubmit={this.handleLogin}>
                <h1>Logon please</h1>
                <FormErrors errors={this.state.errors} />
                <input
                  type="text"
                  name="id"
                  placeholder="Your ID"
                  className="form-control"
                  value={this.state.id}
                  onChange={(e) => this.handleUserInput(e)}
                />
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  className="form-control mt-2"
                  onChange={(e) => this.handleUserInput(e)}
                />
                <button
                  className="btn hero-button"
                  type="submit"
                  disabled={!this.state.validForm}
                >
                  Submit <span>{this.state.validForm}</span>
                </button>

                <Link className="back-link" to="/register">
                  <FiLogIn size={16} color="#e02041"></FiLogIn>I do not have an
                  ID
                </Link>
              </form>
            </section>

            <img
              className="mr-3 d-none d-md-block col-md-8"
              src={heroesImg}
              alt="Heroes"
            />
          </div>
          <footer className="d-flex justify-content-center">
            <h5 className="text-muted">Interactive API documentation with</h5>
            <a
              href={this.linkSwagger}
              className="back-link d-inline mt-0 ml-1"
              target="_blank"
            >
              <Icon
                icon={this.swaggerIcon}
                width={this.sizeSwagger}
                height={this.sizeSwagger}
              />
              Swagger
            </a>
           
          </footer>
        </div>
      </div>
    );
  }
}

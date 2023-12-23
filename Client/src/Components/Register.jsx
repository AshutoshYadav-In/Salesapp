import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const inputStyle = {
    height: '45px',
  };
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/register', {
        name,
        email,
        password,
      });
 if (response.data.message === 'usercreated') {
        alert('User registered successfully!');
        navigate('/login')
      } 
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 400:
            alert('Bad request: User with this email already exists');
            break;
          case 500:
            alert('Internal server error: Failed to register user');
            break;
          default:
            alert('Error registering user. Please try again.');
            break;
        }
      } else {
        alert('Error registering user. Please try again.');
      }
    }
  };
  return (
    <div className='container mt-5'>
      <h2 className='text-center'>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Name'
            style={inputStyle}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className='mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='Email'
            style={inputStyle}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className='mb-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            style={inputStyle}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit' className='btn btn-primary coloradjust w-100'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
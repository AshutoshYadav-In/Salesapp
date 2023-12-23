import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../App';
function Login() {
  const inputStyle = {
    height: '45px',
  };
const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loginStatus, setLoginStatus} = useContext(loginContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/login', {
      email,
      password,
    },{
      withCredentials: true, // Send cookies with the request
    });
  
      if (response.data.message === 'loginsuccessful') {
        setLoginStatus('Login successful');
        navigate("/addsale");
      } 
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        
        switch (status) {
          case 400:
            setLoginStatus('Bad request');
            break;
          case 401:
            setLoginStatus('Invalid credentials');
            break;
          case 500:
            setLoginStatus('Internal server error');
            break;
          default:
            setLoginStatus('Server error');
            break;
        }
      } else {
        setLoginStatus('Server error');
      }
    }
  };
  return (
    <div className='container mt-5'>
      <h2 className='text-center'>Login Form</h2>
      {loginStatus && (
        <div className='alert alert-primary' role='alert'>
          {loginStatus}
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;

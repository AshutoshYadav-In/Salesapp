import React, { useState } from 'react';
import { Link, json } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../index.css'
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { loginContext } from '../App';
import Cookies from 'js-cookie';
function Navigationbar() {
  const [activeLink, setActiveLink] = useState('');
  const { loginStatus, setLoginStatus } = useContext(loginContext);
  const{topSales,setTopSales} = useContext(loginContext);
  const{totalRevenue, setTotalRevenue} = useContext(loginContext);

  // Check cookies for login status on component mount
  useEffect(() => {
    const storedLoginStatus = Cookies.get('loginStatus');
    if (storedLoginStatus) {
      setLoginStatus(storedLoginStatus);
    }
  }, [setLoginStatus]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/logout', {
        withCredentials: true // Setting credentials to true
      });
      setLoginStatus('Logout successful');
      Cookies.remove('loginStatus'); // Clear login status on logout
    } catch (error) {
      console.log(error);
    }
  };
// .....handle topSales......
const handleTopSalesClick = async () => { 
  try {
    const response = await axios.get('http://localhost:4000/topsales', {
      withCredentials: true
    });
    setTopSales(response.data.topSales);
    localStorage.setItem('topSales', JSON.stringify(response.data.topSales));
  } catch (error) {
    console.log(error);
  }
};
// ...handletotalrevenue......
const handleTotalRevenue = async()=>{
  try{
    const response =await axios.get('http://localhost:4000/totalrevenue',{
      withCredentials:true
    });
    setTotalRevenue(response.data.totalRevenue);
    localStorage.setItem('totalRevenue', JSON.stringify(response.data.totalRevenue));
  } catch(error){
    console.log(error);
  }
}
// ..............
const handleClick = (e) => {
  setActiveLink(e.target.name);
  if (e.target.name === 'logout') {
    handleLogout();
  } else if (e.target.name === 'topSales') {
    handleTopSalesClick();
  }
  else if(e.target.name === 'totalRevenue'){
    handleTotalRevenue();
  }
};

  // Update cookies with login status on successful login
  useEffect(() => {
    if (loginStatus === 'Login successful') {
      Cookies.set('loginStatus', loginStatus, { expires: 1 }); // Set expiry as needed
    }
  }, [loginStatus]);
  useEffect(() => {
    const storedTopSales = localStorage.getItem('topSales');
    if (storedTopSales) {
      setTopSales(JSON.parse(storedTopSales));
    }
    const storedTotalRevenue = localStorage.getItem('totalRevenue');
    if(storedTotalRevenue){
      setTotalRevenue(JSON.parse(storedTotalRevenue));
    }
  }, [setTopSales,setTotalRevenue]);

  return (
    <div className='Navbar'>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">SalesApp</Link>
          <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {loginStatus ==="Login successful" && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${activeLink === 'addSales' ? 'active' : 'nonactive'}`} name="addSales" onClick={handleClick} to="/addsale">Add Sales</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${activeLink === 'topSales' ? 'active' : 'nonactive'}`} name="topSales" onClick={handleClick} to="/topsales">Top 5 Sales</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${activeLink === 'revenue' ? 'active' : 'nonactive'}`} name="totalRevenue" onClick={handleClick} to="/totalrevenue">Today's Total Revenue</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${activeLink === 'logout' ? 'active' : 'nonactive'}`} name="logout" onClick={handleClick} to="/login">Logout</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {loginStatus != "Login successful" && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${activeLink === 'login' ? 'active' : 'nonactive'}`} name="login" onClick={handleClick} to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${activeLink === 'register' ? 'active' : 'nonactive'}`} name="register" onClick={handleClick} to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigationbar;

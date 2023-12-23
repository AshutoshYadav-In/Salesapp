import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigationbar from "./Components/Navigationbar";
import Addsale from "./Components/Addsale";
import Topsales from "./Components/Topsales";
import Totalrevenue from "./Components/Totalrevenue";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { useContext, useState } from "react";
export const loginContext = createContext();
function App() {
  const [loginStatus, setLoginStatus] = useState("");
  const[topSales,setTopSales] = useState([]);
  const[totalRevenue, setTotalRevenue] = useState(0);
  return (
    <loginContext.Provider value={{ loginStatus, setLoginStatus, topSales, setTopSales,totalRevenue,setTotalRevenue }} >
    <Router>
      <div className="App">
        <Navigationbar />
        <Routes>
          <Route path="/addsale" element={<Addsale />} />
          <Route path="/topsales" element={<Topsales />} />
          <Route path="/totalrevenue" element={<Totalrevenue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
    </loginContext.Provider>
  );
}

export default App;

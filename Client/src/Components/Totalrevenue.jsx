import React from 'react'
import '../index.css'
import { useContext, useEffect } from 'react';
import { loginContext } from '../App';
function Totalrevenue() {
  const{totalRevenue, setTotalRevenue} = useContext(loginContext);
  return (
    <div className='totalrevenue'>Today's revenue is {totalRevenue}</div>
  )
}

export default Totalrevenue
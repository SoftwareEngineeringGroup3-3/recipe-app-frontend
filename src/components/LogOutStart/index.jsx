import React from 'react'
import styles from './styles.css'
import food from '../../images/food.jpg'


function LogOutStart() {
  return (
    <div className="logOutStart-div">
        <label className="logOutStartText">Do you want to cook with us?</label>
        <a href="/login" className="logOutStart">Login to get started!</a>
        <img src={food} alt={food} className="logFood"></img>
        
        
    </div>
    
  )
}

export default LogOutStart
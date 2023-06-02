import React, { useState } from 'react';
import footballEmblem from '../../images/football-emblem.png';
import footballEmblem2 from '../../images/football-emblem-2.png';

import './Coaches.css';

function Coaches({ mode }) {
  const [coaches, setCoaches] = useState([
    { 
      name: 'Dave Carabino', 
      about: 'Dave Carabino is a seasoned soccer coach with years of experience in molding young athletes into successful players. With an unrivaled passion for soccer, he has dedicated his career to the sport, instilling the love for the game in every player he coaches. His philosophy emphasizes teamwork, discipline, and the importance of having fun. Dave believes in bringing out the best in each player. His approach focuses on the unique potential of every individual. By honing their skills and fostering a positive mindset, he enables his players to reach their full potential both on and off the field.', 
      img: footballEmblem  // Remove the quotes here
    },
    { 
      name: 'Ian Aiken', 
      about: 'Ian Aiken is an exceptional soccer coach who believes in the power of positive reinforcement. He has a strong track record of developing young talent and fostering a love for the sport. Ian’s coaching philosophy revolves around building players’ self-confidence and encouraging continuous improvement. His unique coaching style is characterized by a balance of rigorous training and motivational techniques that inspire his players to reach their fullest potential.', 
      img: footballEmblem2
    }
    // ... more coaches
  ]);


  const containerStyle = mode === 'dark' ? { backgroundColor: '#424242' } : { backgroundColor: '#E0E0E0' };

  return (
    <div className="coaches-container" style={containerStyle}>
    <h1>Coaches</h1>
    {coaches && coaches.map((coach, index) => (
      <div key={index}>
        <h2>{coach.name}</h2>
        <img src={coach.img} alt={coach.name} width="200" />
        <p className="about-text">{coach.about}</p>  
      </div>
    ))}
  </div>
);
}



export default Coaches;

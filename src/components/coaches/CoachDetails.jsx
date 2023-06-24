import React from 'react';

const CoachDetails = ({ coachData }) => {
  return (
    <div>
      <h3>{coachData.name}</h3>
      <p>{coachData.about}</p>
    </div>
  );
};

export default CoachDetails;

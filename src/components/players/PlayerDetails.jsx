import React from 'react';
import PropTypes from 'prop-types';

const PlayerDetails = ({ playerData, imageUrl }) => {
  const { firstName, lastName, ageGroup, position, team, skillLevel, favoritePlayer } = playerData || {};

  return (
    <div>
      <h2>{firstName || 'N/A'} {lastName || 'N/A'}</h2>
      <p><strong>Age Group:</strong> {ageGroup || 'N/A'}</p>
      <p><strong>Position:</strong> {position || 'N/A'}</p>
      <p><strong>Team:</strong> {team || 'N/A'}</p>
      <p><strong>Skill Level:</strong> {skillLevel || 'N/A'}</p>
      <p><strong>Favorite Player:</strong> {favoritePlayer || 'N/A'}</p>
      {imageUrl && (
        <img src={imageUrl} alt="player" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
      )}
    </div>
  );
};

PlayerDetails.propTypes = {
  playerData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    ageGroup: PropTypes.string,
    position: PropTypes.string,
    team: PropTypes.string,
    skillLevel: PropTypes.string,
    favoritePlayer: PropTypes.string,
  }),
  imageUrl: PropTypes.string,
};

export default PlayerDetails;



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const PlayerDetails = () => {
//   const { id } = useParams();
//   const [player, setPlayer] = useState(null);

//   useEffect(() => {
//     fetchPlayerDetails();
//   }, []);

//   const fetchPlayerDetails = async () => {
//     try {
//       const response = await fetch(`/api/playerprofiles/${id}`);
//       const data = await response.json();
//       setPlayer(data.player);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!player) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Player Details</h2>
//       <p>First Name: {player.firstName}</p>
//       <p>Last Name: {player.lastName}</p>
//       <p>Age Group: {player.ageGroup}</p>
//       <p>Position: {player.position}</p>
//       <p>Team: {player.team}</p>
//       <p>Skill Level: {player.skillLevel}</p>
//       <p>Favorite Player: {player.favoritePlayer}</p>
//       <img src={player.img} alt="Player" />
//     </div>
//   );
// };

// export default PlayerDetails;


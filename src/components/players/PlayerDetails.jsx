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



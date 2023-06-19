import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'none',
  color: 'grey',
  top: theme.spacing(1),
  border: 'none',
  right: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'none',
  },
  fontSize: '0.8rem',
}));

function Logout({ onLogout, onAdminUpdate }) {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') {
      onLogout('');
    }
    if (typeof onAdminUpdate === 'function') {
      onAdminUpdate(false);  // Set the admin status to false when user logs out
      console.log('Admin status:', false);  // Log the admin status
    }
    console.log('signout');
    navigate('/');
  };

  return (
    <LogoutButton onClick={signout} variant="contained">
      Logout
    </LogoutButton>
  );
};

export default Logout;








// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// const LogoutButton = styled(Button)(({ theme }) => ({
//   backgroundColor: 'none',
//   color: 'grey',
//   top: theme.spacing(1),
//   border: 'none',
//   right: theme.spacing(1),
//   '&:hover': {
//     backgroundColor: 'none',
//   },
//   fontSize: '0.8rem',
// }));

// function Logout({ onLogout }) {
//   const navigate = useNavigate();

//   const signout = () => {
//     localStorage.removeItem('token');
//     if (typeof onLogout === 'function') {
//       onLogout('');
//     }
//     console.log('signout');
//     navigate('/');
//   };

//   return (
//     <LogoutButton onClick={signout} variant="contained">
//       Logout
//     </LogoutButton>
//   );
// };

// export default Logout;


/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { PageContentStyle } from '../../styles/global.style';
import { useAuthContext } from '../../context/AuthContext';
import { UserLogin } from '../../components/UserLogin';

export const UserAccount = () => {
  const auth = useAuthContext();

  const handleLogout = () => {
    auth.updateUserToken(null);
  };

  if (!auth.userToken) {
    return (
      <div css={PageContentStyle}>
        <UserLogin />
      </div>
    );
  }

  return (
    <div css={PageContentStyle}>
      <Container sx={{ p: 2 }}>
        <IconButton onClick={handleLogout}>
          <Logout />
        </IconButton>
        <Typography variant="body1">User token: {auth.userToken}</Typography>
      </Container>
    </div>
  );
};

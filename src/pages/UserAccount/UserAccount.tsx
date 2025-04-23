/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { PageContentStyle } from '../../styles/global.style';
import { useAuthContext } from '../../context/AuthContext';
import { UserLogin } from '../../components/UserLogin';
import { UserProfileCard } from '../../components/UserProfileCard';

export const UserAccount = () => {
  const auth = useAuthContext();

  const handleLogout = () => {
    auth.updateUserToken(undefined);
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
      <Box sx={{ p: 2 }}>
        <IconButton onClick={handleLogout}>
          <Logout />
        </IconButton>
        <UserProfileCard />
      </Box>
    </div>
  );
};

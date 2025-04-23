import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserBadge } from '../UserBadge';

interface IProps {
  badgeList: number[];
}

export const UserBadgesInfo = ({ badgeList }: IProps) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        User Badges
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        {badgeList.map((id) => (
          <UserBadge key={id} badgeId={id} />
        ))}
      </Box>
    </>
  );
};

import React from 'react';
import { Typography, Grid2 } from '@mui/material';

import { IUserRewards } from '../../services/types';

interface IProps {
  userRewards: IUserRewards;
}

export const UserRewardsInfo = ({ userRewards }: IProps) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        User Rewards
      </Typography>
      <Grid2 container spacing={1}>
        <Grid2 size={4}>
          <Typography color="textPrimary">User points</Typography>
        </Grid2>
        <Grid2 size={8}>
          <Typography>{userRewards.points}</Typography>
        </Grid2>
        <Grid2 size={4}>
          <Typography color="textPrimary">User level</Typography>
        </Grid2>
        <Grid2 size={8}>
          <Typography>{userRewards.level}</Typography>
        </Grid2>
      </Grid2>
    </>
  );
};

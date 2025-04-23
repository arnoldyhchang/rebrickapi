/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Card, CardContent, CircularProgress, Divider, Typography, Grid2 } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { IUserProfileResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';
import { UserRewardsInfo } from '../UserRewardsInfo';
import { UserBadgesInfo } from '../UserBadgesInfo';

export const UserProfileCard = () => {
  const auth = useAuthContext();
  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.USER_PROFILE]({ userToken: auth.userToken });
  const { data, isLoading, error } = useQueryGet<IUserProfileResponse>({ url });

  return (
    <Card sx={{ mt: 4, p: 2, minWidth: '500px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        {isLoading && <CircularProgress color={'primary'} size={30} />}
        {error && (
          <div>
            API error: {error?.message}, {error?.status}, {error?.code}, {error?.apiName}
          </div>
        )}
        {data && (
          <>
            <Box
              component="img"
              src={data.avatar_img}
              alt="profile avatar"
              sx={{ width: 80, height: 80, borderRadius: '8px ' }}
            />
            <Grid2 container spacing={1}>
              <Grid2 size={4}>
                <Typography color="textPrimary">Username</Typography>
              </Grid2>
              <Grid2 size={8}>
                <Typography>{data.username}</Typography>
              </Grid2>
              <Grid2 size={4}>
                <Typography color="textPrimary">Email</Typography>
              </Grid2>
              <Grid2 size={8}>
                <Typography>{data.email}</Typography>
              </Grid2>
              <Grid2 size={4}>
                <Typography color="textPrimary">Location</Typography>
              </Grid2>
              <Grid2 size={8}>
                <Typography>{data.location}</Typography>
              </Grid2>
              <Grid2 size={4}>
                <Typography color="textPrimary">Last Activity</Typography>
              </Grid2>
              <Grid2 size={8}>
                <Typography>{new Date(data.last_activity).toLocaleString()}</Typography>
              </Grid2>
              <Grid2 size={4}>
                <Typography color="textPrimary">Last IP</Typography>
              </Grid2>
              <Grid2 size={8}>
                <Typography>{data.last_ip}</Typography>
              </Grid2>
            </Grid2>
            <Divider sx={{ my: 2 }} />
            <UserRewardsInfo userRewards={data.rewards} />
            <Divider sx={{ my: 2 }} />
            <UserBadgesInfo badgeList={data.rewards.badges} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

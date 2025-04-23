import React, { useState } from 'react';
import { Box, Chip, CircularProgress, Tooltip, Typography, Zoom } from '@mui/material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { IUserBadge } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';

interface IBadgeProps {
  badge: IUserBadge | undefined;
}

const BadgeDetails = ({ badge }: IBadgeProps) => {
  return (
    <>
      {badge ? (
        <Box p={2}>
          <Typography variant="subtitle2" gutterBottom>
            {badge.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {badge.descr}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Code: {badge.code} (Level {badge.level})
          </Typography>
        </Box>
      ) : (
        <Box p={2}>
          <CircularProgress color={'secondary'} size={24} />
        </Box>
      )}
    </>
  );
};

interface IProps {
  badgeId: number;
}

export const UserBadge = ({ badgeId }: IProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.USER_BADGE]({ badgeId });
  const { data } = useQueryGet<IUserBadge>({ url, enabled: isEnabled });

  const handleOpen = () => {
    setIsEnabled(true);
  };

  return (
    <Tooltip onOpen={handleOpen} title={<BadgeDetails badge={data} />} arrow slots={{ transition: Zoom }}>
      <Chip label={`#${badgeId}`} color="primary" size="small" sx={{ cursor: 'pointer' }} />
    </Tooltip>
  );
};

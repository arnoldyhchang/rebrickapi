import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Link } from '@mui/material';
import { ILegoSet } from '../../services/types';

interface IProps {
  sets: ILegoSet[];
}

export const LegoSetList = ({ sets }: IProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', p: 2 }}>
      <List>
        {sets.map((set) => (
          <ListItem key={set.set_num} alignItems="flex-start" sx={{ mb: 2, borderBottom: '1px solid #eee' }}>
            <ListItemAvatar sx={{ pr: 4 }}>
              {/* Use a plain thumbnail image */}
              <img
                src={set.set_img_url}
                alt={set.name}
                loading="lazy"
                style={{
                  width: '160px', // Set a fixed width for the thumbnail
                  height: 'auto', // Let the height adjust to maintain aspect ratio
                  objectFit: 'contain', // Ensure the aspect ratio is respected
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link href={set.set_url} target="_blank" underline="hover" variant="subtitle1">
                  {set.name}
                </Link>
              }
              secondary={
                <span style={{ color: '#666' }}>
                  {' '}
                  {/* Custom color for secondary text */}
                  {`Year: ${set.year} • Parts: ${set.num_parts}`}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

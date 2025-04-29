import React, { useState } from 'react';
import { Box, List, ListItem, ListItemAvatar, Link, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { ILegoSet } from '../../services/types';
import { ImageDialog } from '../ImageDialog';

interface IProps {
  sets: ILegoSet[];
}

export const LegoSetList = ({ sets }: IProps) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const index = Number(event.currentTarget.getAttribute('data-set-id'));
    // safeguard
    const selectedSet = sets.length > index ? sets[index] : null;
    if (selectedSet) {
      setName(selectedSet.name);
      setImageUrl(selectedSet.set_img_url);
    }
  };

  const handleCloseClick = () => {
    setImageUrl('');
    setName('');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', p: 2 }}>
      <List>
        {sets.map((set, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ mb: 2, borderBottom: '1px solid #eee' }}>
            <ListItemAvatar sx={{ pr: 4 }}>
              {/* Use a plain thumbnail image */}
              <img
                src={set.set_img_url}
                alt={set.name}
                data-set-id={index}
                loading="lazy"
                style={{
                  width: '160px', // Set a fixed width for the thumbnail
                  height: 'auto', // Let the height adjust to maintain aspect ratio
                  objectFit: 'contain', // Ensure the aspect ratio is respected
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              />
            </ListItemAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
              <Typography variant="subtitle1">
                {set.set_num} {set.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Year: <b>{set.year}</b> • Parts: {set.num_parts}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Last modified: {new Date(set.last_modified_dt).toLocaleDateString()}
              </Typography>

              <Box display="flex" alignItems="center" gap={1} mt={1.5}>
                <Typography variant="body2" color="text.secondary">
                  External Link
                </Typography>
                <Link
                  href={set.set_url}
                  target="_blank"
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <OpenInNew fontSize="small" />
                </Link>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      <ImageDialog isOpen={imageUrl !== ''} name={name} imageUrl={imageUrl} onCloseClick={handleCloseClick} />
    </Box>
  );
};

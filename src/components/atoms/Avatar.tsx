import React from 'react';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar as MuiAvatar } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

/**

The Avatar component is a custom avatar that provides a switch to toggle between list and grid view.
It utilizes MUI's Avatar component internally.
@component
@param {boolean} gridView - A boolean value indicating whether the current view is in grid mode.
@param {React.Dispatch<React.SetStateAction<boolean>>} setGridView - A function to set the grid view state.
@param {SxProps<Theme>} [style] - Additional style properties for the avatar.
@returns {JSX.Element} The rendered Avatar component.
@author Aravinda Meewalaarachchi
*/


interface AvatarProps {
  gridView: boolean;
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: SxProps<Theme>;
  listIconStyles?: SxProps<Theme>;
  appIconStyles?: SxProps<Theme>;
}

export function Avatar({ gridView, setGridView, styles = {}, listIconStyles = {}, appIconStyles = {} }: AvatarProps): JSX.Element {

  const theme = useTheme();

  return (
      <MuiAvatar
        sx={styles}
        //switch that change the appearance list or grid view
        onClick={() => setGridView((prev:boolean) => !prev)}
      >
        {gridView ? <ListIcon sx={listIconStyles} /> : <AppsIcon sx={appIconStyles} />}
      </MuiAvatar>
  );
}

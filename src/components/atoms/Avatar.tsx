import React, { ReactNode } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

/**

The Avatar component is a custom avatar that provides a switch to toggle between list and grid view.
It utilizes MUI's Avatar component internally.
@component
@param {React.Dispatch<React.SetStateAction<boolean>>} setGridView - A function to set the grid view state.
@param {SxProps<Theme>} [style] - Additional style properties for the avatar.
@returns {JSX.Element} The rendered Avatar component.
@author Aravinda Meewalaarachchi
*/


interface AvatarProps {
  setGridView?: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: SxProps<Theme>;
  children?: ReactNode;
  onclick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, args?:unknown)=>void;
}

export function Avatar({ setGridView, styles = {}, children, onclick }: AvatarProps): JSX.Element {

  const theme = useTheme();

  return (
      <MuiAvatar
        sx={styles}
        //switch that change the appearance list or grid view
        onClick={(e) => {
          if (setGridView) {
            setGridView((prev:boolean) => !prev);
            return;
          }
          onclick && onclick(e);
        }}
      >
        {children}
      </MuiAvatar>
  );
}

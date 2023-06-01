"use client";

import React from 'react';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { Button } from '../atoms/Button';
import { Avatar } from '../atoms/Avatar';

/**
 * A component responsible for rendering the button group that appears in the EmployeeList component.
 *
 * @component
 * @param {boolean} gridView - Determines whether the grid view is active.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setGridView - A function to set the grid view state.
 * @returns {JSX.Element} The rendered EmployeeButtonGroup component.
 * @author Aravinda Meewalaarachchi
 */

export function EmployeeButtonGroup({ gridView, setGridView }: { gridView: boolean; setGridView: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 4 }}>
      <Button
        variant='contained'
        styles={{ borderRadius: 6, px: 1.5, py: 1, textTransform: 'uppercase' }}
        onclick={() => router.push('/employee/add')}
        text={"Add Employee"}
      />
      <Avatar
        styles={{
          backgroundColor: theme?.palette?.primary?.main,
          m: 2,
          '&:hover': { backgroundColor: theme?.palette?.secondary?.main, cursor: 'pointer' },
        }}
        // Switch that changes the appearance to list or grid view
        setGridView={setGridView}
      >
        {gridView ? <ListIcon sx={{ fontSize: 28 }} /> : <AppsIcon sx={{ fontSize: 28 }} />}
      </Avatar>
    </Box>
  );
}

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '../atoms/Button';
import { signOut, useSession } from "next-auth/react"
import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

/**
 * A Component that will responsible for rendering the header of the page
 *
 * @author Aravinda Meewalaarachchi
 *
 */

export default function Header(): JSX.Element {
  const theme = useTheme();
  const { status } = useSession();
  const { push } = useRouter();
  const sx = {
    color: theme?.palette?.primary?.main,
    backgroundColor: "#fff",
    borderRadius: "24px",
    '&:hover': {
      color: '#fff',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#fff'
  },
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Typography variant="body1" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Employee Manager
          </Typography>
          {
            (status === "authenticated") ? (<Button onclick={() => signOut()} styles={sx} text='Logout' />):
                                           (<Button onclick={() => push("/api/auth/signin")} styles={sx} text='SignIn' />)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
"use client";

import React, { ReactNode } from 'react';
import Header from "../../components/organisums/Header";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

/**
 * A component responsible for rendering the "Something Went Wrong" page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be displayed within the page.
 * @param {Error} props.error - The error object containing the error message.
 * @returns {JSX.Element} The rendered SomethingWentWrongPage component.
 * @author Aravinda Meewalaarachchi
 */

type SomethingWentWrongPageProps = {
  children?: ReactNode;
  error?: any
};

const SomethingWentWrongPage = ({ children, error }: SomethingWentWrongPageProps) => {
  return (
    <>
      <Header />
      <Box marginTop={40}>
        <Typography variant="h4" component="h1" align="center">
          Oops! Something Went Wrong
        </Typography>
        <Typography variant="body1" align="center">
          {error?.message}
        </Typography>
        {children && (
          <Typography variant="body1" align="center">
            {children}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SomethingWentWrongPage;



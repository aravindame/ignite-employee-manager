
import React from 'react';
import Header from "../../components/organisums/Header";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

/**
 * A component responsible for rendering the "Page Not Found" page.
 *
 * @component
 * @returns {JSX.Element} The rendered NotFoundPage component.
 * @author Aravinda Meewalaarachchi
 */
export default function NotFoundPage(): JSX.Element {
    return (
        <>
            <Header />
            <Box marginTop={40}>
                <Typography variant="h4" component="h1" align="center">
                    Page Not Found
                </Typography>
                <Typography variant="body1" align="center">
                    The requested page could not be found.
                </Typography>
            </Box>
        </>
    );
}

import { Variant } from '@mui/material/styles/createTypography';
import { createTheme, PaletteOptions, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

/**

The ThemeProviderWrapper component is responsible for wrapping the application with a customized MUI theme.
It utilizes MUI's ThemeProvider component internally.

@component
@param {ReactNode} children - The child components to be wrapped by the theme provider.
@returns {JSX.Element} The rendered ThemeProviderWrapper component.
@author Aravinda Meewalaarachchi
*/

interface CustomPaletteColorOptions {
    main: string;
    error: string;
    success: string;
    btnBackground: string
}
interface CustomPaletteOptions extends PaletteOptions {
    tableCellHead: {
        background: string;
        boarder: string;
        button: string;
    };
}

interface CustomTypographyProps {
    variant: Variant | string;
  }


const theme = createTheme({
    palette: {
        primary: {
            main: '#5b00d1',
            error: '#ef5350',
            success: '#4caf50',
        } as CustomPaletteColorOptions,
        secondary: {
            main: '#4801A3',
            btnBackground: '#f2f4f2',
        } as CustomPaletteColorOptions,
        tableCellHead: {
            background: '#8DB255',
            boarder: '#729143',
            button: '#486e25',
        },
    } as CustomPaletteOptions,
    spacing: 8,
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f2f4f2',
                    borderBottom: '2px solid #a6b2a9',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: { backgroundColor: '#f2f4f2' },
            },
        } as any,
        MuiAvatar: {
            variants: [
                {
                    props: {
                        variant: 'rounded',
                    },
                    style: {
                        fontSize: 8,
                        display: 'block',
                        fontWeight: 'bold',
                    },
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: 'text-card-info' as CustomTypographyProps | any
                    },
                    style: {
                        fontSize: 12,
                        display: 'block',
                        fontWeight: 'bold',
                    },
                },
                {
                    props: {
                        variant: 'body1',
                    },
                    style: {
                        fontSize: 24,
                        fontWeight: 600,
                    },
                },
                {
                    props: {
                        variant: 'body2',
                    },
                    style: {
                        fontSize: 16,
                    },
                },
                {
                    props: {
                        variant: 'body3' as CustomTypographyProps | any,
                    },
                    style: {
                        fontSize: 8,
                    },
                },
                {
                    props: {
                        variant: 'table-data' as CustomTypographyProps | any,
                    },
                    style: {
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                },
            ],
        },
    },
});

interface ThemeProviderWrapperProps {
    children: ReactNode;
}

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

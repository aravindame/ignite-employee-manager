import React from 'react';
import {Button as MUIButton } from '@mui/material';
import { useRouter } from 'next/router';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

/**

The Button component is responsible for rendering a button.
It utilizes MUI's Button component internally.

@component
@param {string} text - The text content of the button.
@param {Function} callback - The callback function to be invoked when the button is clicked.
@param {SxProps<Theme>} [style] - Additional style properties for the button.
@param {ButtonPropsVariantOverrides} [variant='contained'] - The variant of the button (text, contained, outlined).
@param {string} [routes=''] - The route to navigate when the button is clicked.
@returns {JSX.Element} The rendered Button component.
@author Aravinda Meewalaarachchi

*/

type ButtonPropsVariantOverrides = "text" | "contained" | "outlined";

interface ButtonProps {
    text: string;
    callback: (event?: Event, args?: unknown) => unknown;
    style?: SxProps<Theme>;
    variant?: ButtonPropsVariantOverrides | undefined;
    routes?: string;
}

export function Button({ style = {}, variant='contained', routes = '', callback, text }: ButtonProps): JSX.Element {
    const router = useRouter();
    const theme = useTheme();
    return (
        <MUIButton
            variant = {variant}
            sx={style}
            onClick={() => routes.length === 0 ? callback(): router.push(routes)}
        >
            {text}
        </MUIButton>
    );
}

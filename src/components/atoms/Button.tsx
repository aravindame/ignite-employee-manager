import React, { MouseEventHandler, ReactNode } from 'react';
import {Button as MUIButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SxProps, Theme } from '@mui/material/styles';

/**

The Button component is responsible for rendering a button.
It utilizes MUI's Button component internally.

@component
@param {string} text - The text content of the button.
@param {Function} callback - The callback function to be invoked when the button is clicked.
@param {SxProps<Theme>} [style] - Additional style properties for the button.
@param {ButtonPropsVariantOverrides} [variant='contained'] - The variant of the button (text, contained, outlined).
@returns {JSX.Element} The rendered Button component.
@author Aravinda Meewalaarachchi

*/

type ButtonPropsVariantOverrides = "text" | "contained" | "outlined";

interface ButtonProps {
    text?: string;
    onclick: MouseEventHandler<HTMLButtonElement>;
    styles?: SxProps<Theme>;
    variant?: ButtonPropsVariantOverrides | undefined;
    children?: ReactNode;
}

export function Button({ styles = {}, variant='contained', onclick, text, children }: ButtonProps): JSX.Element {
    const router = useRouter();
    return (
        <MUIButton
            variant = {variant}
            sx={styles}
            onClick={onclick}
        >   
            {children || text}
        </MUIButton>
    );
}

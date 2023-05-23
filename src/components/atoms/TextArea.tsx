import React, { ReactNode } from 'react';
import { Typography, TypographyTypeMap } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { OverridableComponent } from '@mui/material/OverridableComponent';

/**

The TextArea component is responsible for rendering a text area with customizable styling and variant.
It utilizes MUI's Typography component internally.
@component
@param {string} text - The text content of the text area.
@param {SxProps<Theme>} [style] - Additional style properties for the text area.
@param {OverridableComponent<TypographyTypeMap<{}, "span">> | string | undefined} variant - The variant of the text area.
@param {ReactNode} children - The child nodes to be rendered within the text area.
@returns {JSX.Element} The rendered TextArea component.
@author Aravinda Meewalaarachchi
*/

interface TextAreaProps {
    text: string;
    style?: SxProps<Theme>;
    variant: OverridableComponent<TypographyTypeMap<{}, "span">> | string | undefined;
    children: ReactNode;
}

export function TextArea({ style = {}, variant, text, children }: TextAreaProps): JSX.Element {
    return (
        <Typography
            variant={variant as any}
            sx={style}
        >
            <>{children}</>
            <>{text}</>
        </Typography>
    );
}
import React, { ReactNode } from 'react';
import { Typography as MUITypography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

/**

The TextArea component is responsible for rendering a text area with customizable styling and variant.
It utilizes MUI's Typography component internally.
@component
@param {string} text - The text content of the text area.
@param {SxProps<Theme>} [style] - Additional style properties for the text area.
@param {TypographyVariant} variant - The variant of the text area.
@param {ReactNode} children - The child nodes to be rendered within the text area.
@returns {JSX.Element} The rendered TextArea component.
@author Aravinda Meewalaarachchi
*/

type CustomTypographyVariant = 'text-card-info' | 'customForm' | 'inherit' | 'table-data';

interface TypographyProps {
  variant?: CustomTypographyVariant;
  text?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  children?: ReactNode;
  styles?: SxProps<Theme>;
  width?: number;
  color?: string;
  id?: string;
}

export function Typography({ styles = {}, variant, text, children, textTransform, width, color, id }: TypographyProps): JSX.Element {
    return (
        <MUITypography
            variant={variant as any}
            sx={styles}
            textTransform={textTransform}
            width={width}
            color={color}
            id={id}
        >
            <>{children}</>
            <>{text !== "undefined" ? text : ""}</>
        </MUITypography>
    );
}
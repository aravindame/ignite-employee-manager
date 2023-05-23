import React, { ReactNode } from 'react';
import { Tooltip as MUITooltip } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

/**

The Tooltip component is responsible for rendering a tooltip with a specified title and customizable style.
It utilizes MUI's Tooltip component internally.
@component
@param {string} title - The title of the tooltip.
@param {SxProps<Theme>} [style] - Additional style properties for the tooltip.
@param {ReactNode} [children] - The child nodes to be rendered within the tooltip.
@returns {JSX.Element} The rendered Tooltip component.
@author Aravinda Meewalaarachchi
*/

interface TooltipProps {
    title: string;
    style?: SxProps<Theme>;
    children?: ReactNode;
}

export function Tooltip({ style = {}, children, title }: TooltipProps): JSX.Element {
    return (
        <MUITooltip
            sx={style}
            title={title}
        >
            <>{children}</>
        </MUITooltip>
    );
}
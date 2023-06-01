import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

/**

The Dropdown component is responsible for rendering a dropdown select input with a list of options.
It utilizes MUI's Select and MenuItem components internally.

@component
@param {string[]} list - The list of options for the dropdown.
@param {SxProps<Theme>} [style] - Additional style properties for the dropdown.
@param {string} labelId - The id of the label element associated with the dropdown.
@param {string} id - The id of the dropdown element.
@param {boolean} [fullWidth=true] - Determines whether the dropdown should take up the full width.
@param {string} value - The currently selected value of the dropdown.
@param {(event?: SelectChangeEvent<string>) => void } onChange - The callback function to be invoked when the value of the dropdown changes.
@returns {JSX.Element} The rendered Dropdown component.
@author Aravinda Meewalaarachchi
*/

interface DropdownProps {
    list: string [];
    style?: SxProps<Theme>;
    labelId: string
    id: string
    fullWidth: boolean
    value: string
    onChange: (event: SelectChangeEvent<string>) => void;
}

export function Dropdown({ style = {}, list, labelId, id, fullWidth=true, value, onChange  }: DropdownProps): JSX.Element {
    return (
        <Select
            sx={style}
            labelId={labelId}
            id={id}
            fullWidth = {fullWidth}
            value={value}
            onChange={onChange}
        >
            {
                list && list.map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)
            }
        </Select>
    );
}
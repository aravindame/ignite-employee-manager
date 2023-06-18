import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip } from './../../../components/atoms/Tooltip';

describe('Tooltip', () => {
    it('renders tooltip with children', () => {
        const title = 'This is a tooltip';
        const content = 'Hover me!';
        const { getByText } = render(
            <Tooltip title={title}>
                <span>{content}</span>
            </Tooltip>
        );

        const tooltipElement = getByText(content);
        expect(tooltipElement).toBeInTheDocument();
    });
});

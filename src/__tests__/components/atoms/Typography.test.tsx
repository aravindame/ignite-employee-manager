import React from 'react';
import { render } from '@testing-library/react';
import { Typography } from './../../../components/atoms/Typography';

describe('Typography component.', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<Typography text="Hello, World!" />);
    const textElement = getByText('Hello, World!');
    expect(textElement).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Typography>Child component</Typography>);
    const childElement = getByText('Child component');
    expect(childElement).toBeInTheDocument();
  });

  it('applies styles correctly', () => {
    const style = { fontSize: '16px', fontWeight: 'bold' };
    const { container } = render(<Typography styles={style} />);
    const typographyElement = container.firstChild;
    expect(typographyElement).toHaveStyle('font-size: 16px');
    expect(typographyElement).toHaveStyle('font-weight: 700');
  });

  it('applies textTransform correctly', () => {
    const { container } = render(<Typography textTransform="uppercase" />);
    const typographyElement = container.firstChild;
    expect(typographyElement).toHaveStyle('text-transform: uppercase');
  });

  it('applies width correctly', () => {
    const { container } = render(<Typography width={200} />);
    const typographyElement = container.firstChild;
    expect(typographyElement).toHaveStyle('width: 200px');
  });

  it('applies color correctly', () => {
    const { container } = render(<Typography color="red" />);
    const typographyElement = container.firstChild;
    expect(typographyElement).toHaveStyle('color: red');
  });

  it('applies id correctly', () => {
    const { container } = render(<Typography id="text-area" />);
    const typographyElement = container.firstChild;
    expect(typographyElement).toHaveAttribute('id', 'text-area');
  });
});

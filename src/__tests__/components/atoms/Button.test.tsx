import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './../../../components/atoms/Button';

describe('Button component', () => {
  it('renders button with text', () => {
    const buttonText = 'Click me';
    const handleClick = jest.fn();

    const { getByText } = render(
      <Button onclick={handleClick} text={buttonText} />
    );

    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('triggers onClick callback when clicked', () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Button onclick={handleClick} text="Click me" />
    );

    const button = getByText('Click me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders button with children', () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Button onclick={handleClick}>
        <span>Click me</span>
      </Button>
    );

    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
  });
});

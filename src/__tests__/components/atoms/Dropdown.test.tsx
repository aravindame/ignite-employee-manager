import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './../../../components/atoms/Dropdown';

describe('Dropdown', () => {
  const list = ['Option 1'];
  const labelId = 'dropdown-label';
  const id = 'dropdown-id';
  const className = 'MuiInputBase-root';
  const value = 'Option 1';
  const onChange = jest.fn();

  it('renders the dropdown with options', () => {
    const { container } =render(
      <Dropdown
        list={list}
        labelId={labelId}
        id={id}
        fullWidth={true}
        value={value}
        onChange={onChange}
      />
    );
    const dropdown = container.querySelector(`.${className}`);
    expect(dropdown).toBeInTheDocument();

    const options = screen.getAllByRole('button');
    expect(options).toHaveLength(list.length);

    options.forEach((option, index) => {
      expect(option).toHaveTextContent(list[index]);
    });
  });
});

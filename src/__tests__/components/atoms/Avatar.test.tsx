import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Avatar } from './../../../components/atoms/Avatar';

describe('Avatar component', () => {
  test('renders without errors', () => {
    render(<Avatar />);
  });

  test('triggers onClick event when clicked', () => {
    const onClickMock = jest.fn();
    const { container } = render(<Avatar onclick={onClickMock} />);
    fireEvent.click((container as any).firstChild);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('toggles grid view when setGridView prop is provided', () => {
    const setGridViewMock = jest.fn();
    const { container } = render(<Avatar setGridView={setGridViewMock} />);
    fireEvent.click((container as any).firstChild);
    expect(setGridViewMock).toHaveBeenCalledTimes(1);
    expect(setGridViewMock).toHaveBeenCalledWith(expect.any(Function));
  });
});

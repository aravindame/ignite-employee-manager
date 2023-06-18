import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeeGridView } from '../../../../src/components/organisums/EmployeeGridView';
import { createStore } from 'redux';

const store = createStore(() => ({}));
let mockGridView;
let mockSetGridView;

beforeEach(() => {
  mockGridView = false;
  mockSetGridView = jest.fn().mockImplementation((value) => {
    mockGridView = value;
  });
  jest.spyOn(React, 'useState').mockReturnValue([mockGridView, mockSetGridView]);
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('EmployeeGridView', () => {
  test('renders a grid view of employee cards', () => {
    const employees = [
      {
        _id: '1',
        photo: 'https://randomuser.me/api/portraits/men/92.jpg',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        number: '123456789',
        gender: 'Male',
      },
    ];
    render(<EmployeeGridView employees={employees} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
});

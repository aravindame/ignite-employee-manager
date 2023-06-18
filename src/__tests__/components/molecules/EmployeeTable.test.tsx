import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createStore } from 'redux';
import { EmployeeTable } from './../../../components/molecules/EmployeeTable';

const store = createStore(() => ({}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const customPalette = {
  tableCellHead: {
    background: '#ffffff', 
    boarder: '#000000', 
    button: '#ff0000', 
  },
};

const theme = createTheme({
  palette: customPalette as any,
});

describe('EmployeeTable', () => {
  test('renders employee table with correct information', () => {
    const employees = [
      {
        _id: '1',
        photo: 'https://randomuser.me/api/portraits/men/92.jpg',
        name_img: 'Employee 1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        number: '123456789',
        gender: 'Male',
      },
    ];

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EmployeeTable employees={employees} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
});
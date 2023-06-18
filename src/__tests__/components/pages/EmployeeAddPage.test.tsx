import React from 'react';
import { render } from '@testing-library/react';
import EmployeeAddPage from '../../../components/pages/EmployeeAddPage';
import { EmployeeForm } from '../../../components/templates/EmployeeForm';
import Header from '../../../components/organisums/Header';


jest.mock('../../../components/templates/EmployeeForm', () => ({
    EmployeeForm: jest.fn(() => <div data-testid="employee-form">EmployeeForm</div>),
}));

jest.mock('../../../components/organisums/Header', () => () => <div data-testid="header">Header</div>);

jest.mock('next-auth/react', () => ({
    useSession: ()=>{
      return { status: 'authenticated', signOut: jest.fn() }
    },
  }));
  
  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

describe('EmployeeAddPage', () => {
    test('renders the header and employee form', () => {
        const { getByTestId } = render(<EmployeeAddPage />);
        expect(getByTestId('header')).toBeInTheDocument();
        expect(getByTestId('employee-form')).toBeInTheDocument();
    });
});

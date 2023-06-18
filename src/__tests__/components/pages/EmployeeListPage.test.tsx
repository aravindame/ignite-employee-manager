/* eslint-disable react/display-name */
import { render } from '@testing-library/react';
import EmployeeListPage from '../../../components/pages/EmployeeListPage';
import Header from '../../../components/organisums/Header';
import EmployeeListView from '../../../components/organisums/EmployeeListView';

jest.mock('../../../components/organisums/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../../components/organisums/EmployeeListView', () => () => <div data-testid="employeeList">Employee List</div>);

jest.mock('next-auth/react', () => ({
  useSession: ()=>{
    return { status: 'authenticated', signOut: jest.fn() }
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('EmployeeListPage', () => {
  it('renders header and employee list', () => {
    const { getByTestId } = render(<EmployeeListPage />);
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('employeeList')).toBeInTheDocument();
  });
});

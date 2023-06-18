import React from 'react';
import { render } from '@testing-library/react';
import EmployeeList from '../../../components/organisums/EmployeeListView';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: ()=>{
    return {
      payload: {
        employee: {
          firstName: "John",
          lastName: "Doe",
          email: "John.Doe@example.com",
          number: "0775678123",
          gender: "M",
          photo: "http://example.com/image/user.jpg",
        },
      },
      loading: false,
    }
  },
}));

jest.mock('../../../components/organisums/EmployeeGridView', () => ({
  EmployeeGridView: jest.fn(() => <div data-testid="employee-grid-view">EmployeeGridView</div>),
}));

jest.mock('../../../components/molecules/EmployeeTable', () => ({
  EmployeeTable: jest.fn(() => <div data-testid="employee-table">Table</div>),
}));

describe('EmployeeList', () => {

  test('renders employee list in table view by default', () => {
    const useStateMock = (initialValue:boolean) => [!initialValue, jest.fn()];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock as any);
     const { getByTestId } = render(<EmployeeList />);
        expect(getByTestId('employee-table')).toBeInTheDocument();
  });

});

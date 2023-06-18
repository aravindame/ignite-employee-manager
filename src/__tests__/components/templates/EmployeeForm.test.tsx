import React from 'react';
import { render } from '@testing-library/react';
import { EmployeeForm } from './../../../components/templates/EmployeeForm';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: ()=>{
    return {
      employee: {
        firstName: "John",
        lastName: "Doe",
        email: "John.Doe@example.com",
        number: "0775678123",
        gender: "M",
        photo: "http://example.com/image/user.jpg",
      },
    }
  },
}));

jest.mock('next/navigation', () => ({
useRouter: jest.fn(),
}));

describe('EmployeeForm', () => {
  it('renders the employee form with required fields', () => {
    const {container} = render(<EmployeeForm />);
    
    expect(container.querySelector("#firstName")).toBeInTheDocument();
    expect(container.querySelector("#lastName")).toBeInTheDocument();
    expect(container.querySelector("#email")).toBeInTheDocument();
    expect(container.querySelector("#number")).toBeInTheDocument();
  });
});

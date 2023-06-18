/* eslint-disable react/display-name */
import { render } from '@testing-library/react';
import EmployeeEditPage from '../../../components/pages/EmployeeEditPage';
import Header from '../../../components/organisums/Header';

jest.mock('../../../components/organisums/Header', () => () => <div data-testid="header">Header</div>);

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

  jest.mock('next-auth/react', () => ({
    useSession: ()=>{
      return { status: 'authenticated', signOut: jest.fn() }
    },
  }));
  
  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  describe('EmployeeForm', () => {
    it('renders the employee form with required fields', () => {
      const {container} = render(<EmployeeEditPage />);
      
      expect(container.querySelector("#firstName")).toBeInTheDocument();
      expect(container.querySelector("#lastName")).toBeInTheDocument();
      expect(container.querySelector("#email")).toBeInTheDocument();
      expect(container.querySelector("#number")).toBeInTheDocument();
    });
  });
  
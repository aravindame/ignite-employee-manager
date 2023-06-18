import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../components/organisums/Header';

const signOut = jest.fn();

jest.mock('next-auth/react', () => ({
  useSession: ()=>{
    return { status: 'authenticated', signOut }
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: ()=>{
    return {
      push: jest.fn()
    }
  },
}));

describe('Header', () => {

  test('renders correctly', () => {
    render(<Header />);
        expect(screen.getByText('Employee Manager')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});

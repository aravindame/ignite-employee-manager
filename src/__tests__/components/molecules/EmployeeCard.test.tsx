import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EmployeeCard from './../../../components/molecules/EmployeeCard';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('EmployeeCard', () => {
    const employee = {
        _id: '1',
        photo: 'https://randomuser.me/api/portraits/men/92.jpg',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        number: '1234567890',
        gender: 'Male',
    };

    test('renders employee card with correct information', () => {
        render(<EmployeeCard employee={employee} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('Male')).toBeInTheDocument();
    });

    test('navigates to edit employee page on edit icon click', () => {
        const mockRouterPush = jest.fn();
        jest.mock('next/navigation', () => ({
            useRouter: () => ({
                push: mockRouterPush,
            }),
        }));

        const {container} = render(<EmployeeCard employee={employee} />);

        const editIcon:any = container.querySelector(".css-1a01xsy-MuiAvatar-root");
        const result = fireEvent.click(editIcon);
        expect(result).toBe(true);
    });
});
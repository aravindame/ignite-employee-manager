import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeeButtonGroup } from './../../../components/molecules/EmployeeButtonGroup';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

test('renders Add Employee button', () => {
    render(<EmployeeButtonGroup gridView={true} setGridView={jest.fn()} />);
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
});

test('calls router.push when Add Employee button is clicked', () => {
    const routerPushMock = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
        push: routerPushMock,
    });

    render(<EmployeeButtonGroup gridView={true} setGridView={jest.fn()} />);
    const addButton = screen.getByText('Add Employee');
    fireEvent.click(addButton);
    expect(routerPushMock).toHaveBeenCalledWith('/employee/add');
});

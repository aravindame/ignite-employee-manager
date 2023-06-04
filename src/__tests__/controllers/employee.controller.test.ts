import { addEmployeeHandler, listAllEmployeeHandler } from './../../controllers/employee.controller';
import { addEmployee, listAllEmployees } from './../../services/employee.services';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('./../../services/employee.services', () => ({
  listAllEmployees: jest.fn(),
  addEmployee: jest.fn(),
}));

describe('listEmployeeHandler', () => {
  const mockRequest = {} as NextApiRequest;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should retrieve all employees and respond with a JSON containing the employees', async () => {
    const mockEmployees = [
      { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
      { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' },
    ];
    (listAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

    await listAllEmployeeHandler(mockRequest, mockResponse);

    expect(listAllEmployees).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ employees: mockEmployees });
  });


});
  
  describe('addEmployeeHandler', () => {
    const mockRequest = {
      body: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        number: '1234567890',
        gender: 'M',
        photo: 'photo-url',
      },
    } as NextApiRequest;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('should add an employee and respond with a JSON containing the added employee', async () => {
      const mockAddedEmployee = {
        _id: 'employee-id',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        number: '1234567890',
        gender: 'M',
        photo: 'photo-url',
      };
      (addEmployee as jest.Mock).mockResolvedValue(mockAddedEmployee);
  
      await addEmployeeHandler(mockRequest, mockResponse);
  
      expect(addEmployee).toHaveBeenCalledTimes(1);
      expect(addEmployee).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  
import { addEmployeeHandler, listAllEmployeeHandler, updateEmployeeHandler, deleteEmployeeHandler } from './../../controllers/employee.controller';
import { addEmployee, listAllEmployees, updateEmployee, deleteEmployee } from './../../services/employee.services';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('./../../services/employee.services', () => ({
  listAllEmployees: jest.fn(),
  addEmployee: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
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

  describe('updateEmployeeHandler', () => {
    let req: any;
    let res: any;
  
    beforeEach(() => {
      req = {
        body: { /* mocked request body */ },
        query: { employeeId: '123' },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update the employee and send the updated data as a response', async () => {
      // Mock the service function
      const updatedEmployee = { /* mocked updated employee data */ };
      (updateEmployee as jest.Mock).mockResolvedValue(updatedEmployee);
  
      // Call the handler function
      await updateEmployeeHandler(req, res);
  
      // Verify the service function was called with the correct arguments
      expect(updateEmployee).toHaveBeenCalledWith(req.body, req.query.employeeId);
  
      // Verify the response status and data
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(updatedEmployee);
    });
  
  });

  describe('deleteEmployeeHandler', () => {
    let req: any;
    let res: any;
  
    beforeEach(() => {
      req = {
        query: { employeeId: '123' },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete the employee and send a success response', async () => {
      // Call the handler function
      await deleteEmployeeHandler(req, res);
  
      // Verify the service function was called with the correct argument
      expect(deleteEmployee).toHaveBeenCalledWith(req.query.employeeId);
  
      // Verify the response status and data
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
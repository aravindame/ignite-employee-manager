import { createAsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Includes all the redux action creator related functions. 
 *
 * @author Aravinda Meewalaarachchi
 */

interface Employee {
  _id?: string;
}

interface ErrorResponse {
  message: string;
}

interface FetchAllEmployeesResponse {
  employees: Employee[];
}

interface CreateEmployeeResponse {
  data: Employee;
}

interface UpdateEmployeeResponse {
  data: Employee;
}

// Configure the base URL for HTTP requests
const urlConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
};

/**
 * Handles request errors and returns an ErrorResponse object.
 *
 * @param {any} error - The error object.
 * @returns {ErrorResponse} - The ErrorResponse object.
 */

const handleRequestError = (error: any): ErrorResponse => {
  return error?.response?.data || error?.message ||
    { message: 'Unknown error occurred' };
};

/**
 * Payload creator for fetching all employees.
 *
 * @type {AsyncThunkPayloadCreator<Employee[], string, { rejectValue: ErrorResponse }>}
 */

const fetchAllEmployeesPayloadCreator: AsyncThunkPayloadCreator<
  Employee[],
  string,
  { rejectValue: ErrorResponse }
> = async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<FetchAllEmployeesResponse>(urlConfig.BASE_URL);
    return response?.data?.employees || [];
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

/**
 * Payload creator for creating an employee.
 *
 * @type {AsyncThunkPayloadCreator<CreateEmployeeResponse, { employee: Employee }, { rejectValue: ErrorResponse }>}
 */
const createEmployeePayloadCreator: AsyncThunkPayloadCreator<
  CreateEmployeeResponse,
  { employee: Employee },
  { rejectValue: ErrorResponse }
> = async (employee, { rejectWithValue }) => {
  try {
    const response = await axios.post<CreateEmployeeResponse>(urlConfig.BASE_URL, employee);
    return response?.data || null;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

/**
 * Payload creator for updating an employee.
 *
 * @type {AsyncThunkPayloadCreator<UpdateEmployeeResponse, { data: Employee; employeeId: string }, { rejectValue: ErrorResponse }>}
 */
const updateEmployeePayloadCreator: AsyncThunkPayloadCreator<
  UpdateEmployeeResponse,
  { data: Employee; employeeId: string },
  { rejectValue: ErrorResponse }
> = async ({ data, employeeId }, { rejectWithValue }) => {
  try {
    const response = await axios.put<UpdateEmployeeResponse>(
      `${urlConfig.BASE_URL}/${employeeId}`,
      data
    );
    return response?.data || null;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

/**
 * Payload creator for deleting an employee.
 *
 * @type {AsyncThunkPayloadCreator<string, string, { rejectValue: ErrorResponse }>}
 */
const deleteEmployeePayloadCreator: AsyncThunkPayloadCreator<
  string,
  string,
  { rejectValue: ErrorResponse }
> = async (employeeId, { rejectWithValue }) => {
  try {
    await axios.delete(`${urlConfig.BASE_URL}/${employeeId}`);
    return employeeId;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

/**
 * Fetches all employees asynchronously.
 *
 * @function fetchAllEmployees
 * @returns {AsyncThunkAction<Employee[], string, { rejectValue: ErrorResponse }>}
 */

export const fetchAllEmployees = createAsyncThunk(
  'employee/fetchAll',
  fetchAllEmployeesPayloadCreator
);

/**
 * Creates an employee asynchronously.
 *
 * @function createEmployee
 * @param {Employee} employee - The employee object to create.
 * @returns {AsyncThunkAction<CreateEmployeeResponse, { employee: Employee }, { rejectValue: ErrorResponse }>}
 */

export const createEmployee = createAsyncThunk(
  'employee/create',
  createEmployeePayloadCreator
);

/**
 * Updates an employee asynchronously.
 *
 * @function updateEmployee
 * @param {Object} data - The updated employee data.
 * @param {string} employeeId - The ID of the employee to update.
 * @returns {AsyncThunkAction<UpdateEmployeeResponse, { data: Employee; employeeId: string }, { rejectValue: ErrorResponse }>}
 */

export const updateEmployee = createAsyncThunk(
  'employee/update',
  updateEmployeePayloadCreator
);

/**
 * Deletes an employee asynchronously.
 *
 * @function deleteEmployee
 * @param {string} employeeId - The ID of the employee to delete.
 * @returns {AsyncThunkAction<string, string, { rejectValue: ErrorResponse }>}
 */

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  deleteEmployeePayloadCreator
);

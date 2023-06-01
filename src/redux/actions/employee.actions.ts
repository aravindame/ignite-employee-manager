import { createAsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios from 'axios';
import * as data from '@/../../src/data/employees.json';

interface Employee {
  _id: string;
}

interface ErrorResponse {
  message: string;
}

interface FetchAllEmployeesResponse {
  employees: Employee[];
}

interface CreateEmployeeResponse {
  employee: Employee;
}

interface UpdateEmployeeResponse {
  updatedEmployee: Employee;
}

// Configure the base URL for HTTP requests
const urlConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
};

const handleRequestError = (error: any): ErrorResponse => {
  return error?.response?.data || { message: 'Unknown error occurred' };
};

const fetchAllEmployeesPayloadCreator: AsyncThunkPayloadCreator<
  Employee[],
  string,
  { rejectValue: ErrorResponse }
> = async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<FetchAllEmployeesResponse>(urlConfig.BASE_URL);
    return response?.data?.employees || data.data || [];
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

const createEmployeePayloadCreator: AsyncThunkPayloadCreator<
  Employee,
  { employee: Employee },
  { rejectValue: ErrorResponse }
> = async ({ employee }, { rejectWithValue }) => {
  try {
    const response = await axios.post<CreateEmployeeResponse>(urlConfig.BASE_URL, employee);
    return response?.data?.employee || null;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

const updateEmployeePayloadCreator: AsyncThunkPayloadCreator<
  Employee,
  { data: Employee; employeeId: string },
  { rejectValue: ErrorResponse }
> = async ({ data, employeeId }, { rejectWithValue }) => {
  try {
    const response = await axios.put<UpdateEmployeeResponse>(
      `${urlConfig.BASE_URL}/${employeeId}`,
      data
    );
    return response?.data?.updatedEmployee || null;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
};

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

export const fetchAllEmployees = createAsyncThunk(
  'employee/fetchAll',
  fetchAllEmployeesPayloadCreator
);

export const createEmployee = createAsyncThunk(
  'employee/create',
  createEmployeePayloadCreator
);

export const updateEmployee = createAsyncThunk(
  'employee/update',
  updateEmployeePayloadCreator
);

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  deleteEmployeePayloadCreator
);

import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from '../../../src/redux/actions/employee.actions';
import {
  createEmployeeFulfilledReducer,
  deleteEmployeeFulfilledReducer,
  fetchAllEmployeesFulfilledReducer,
  pendingReducer,
  rejectedReducer,
  updateEmployeeFulfilledReducer,
} from '../../../src/redux/reducers/employee.reducers';
import { TypedActionCreator } from '@reduxjs/toolkit/dist/listenerMiddleware/types';

/**
 * Includes all the redux feature slices related functions. 
 *
 * @author Aravinda Meewalaarachchi
 */

interface Employee {
  _id: string;
}

interface EmployeeState {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean | null;
  status: string | null;
  error: any;
}

const initialState: EmployeeState = {
  employees: [],
  employee: null,
  loading: null,
  status: null,
  error: null,
};

interface FindEmployeeByIdAction extends PayloadAction<string> { }

/**
 * Slice for managing employee state.
 *
 * @name employeeSlice
 * @type {Slice<EmployeeState>}
 */

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    /**
   * Finds an employee by ID.
   *
   * @function findEmployeeById
   * @param {EmployeeState} state - The current employee state.
   * @param {PayloadAction<string>} action - The action containing the employee ID.
   * @returns {EmployeeState} - The updated employee state with the found employee.
   */

    findEmployeeById(state, action: FindEmployeeByIdAction) {
      const result = state.employees.filter((item) => {
        return item._id === action.payload;
      });
      return { ...state, employee: result[0] };
    },
    /**
 * Clears the currently selected employee.
 *
 * @function clearEmployee
 * @param {EmployeeState} state - The current employee state.
 * @returns {EmployeeState} - The updated employee state with the cleared employee.
 */

    clearEmployee(state) {
      return { ...state, employee: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);
    builder.addCase(createEmployee.pending as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);
    builder.addCase(updateEmployee.pending as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);
    builder.addCase(deleteEmployee.pending as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);

    builder.addCase(fetchAllEmployees.fulfilled as TypedActionCreator<string>, fetchAllEmployeesFulfilledReducer as CaseReducer<any>);
    builder.addCase(createEmployee.fulfilled as TypedActionCreator<string>, createEmployeeFulfilledReducer as any);
    builder.addCase(updateEmployee.fulfilled as TypedActionCreator<string>, updateEmployeeFulfilledReducer as CaseReducer<any>);
    builder.addCase(deleteEmployee.fulfilled as TypedActionCreator<string>, deleteEmployeeFulfilledReducer as CaseReducer<any>);

    builder.addCase(fetchAllEmployees.rejected as TypedActionCreator<string>, rejectedReducer as CaseReducer<any>);
    builder.addCase(createEmployee.rejected as TypedActionCreator<string>, rejectedReducer as CaseReducer<any>);
    builder.addCase(updateEmployee.rejected as TypedActionCreator<string>, rejectedReducer as CaseReducer<any>);
    builder.addCase(deleteEmployee.rejected as TypedActionCreator<string>, rejectedReducer as CaseReducer<any>);
  },
});

export const { findEmployeeById, clearEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;

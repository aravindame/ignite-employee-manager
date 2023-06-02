import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from '@/../../src/redux/actions/employee.actions';
import {
  createEmployeeFulfilledReducer,
  deleteEmployeeFulfilledReducer,
  fetchAllEmployeesFulfilledReducer,
  pendingReducer,
  rejectedReducer,
  updateEmployeeFulfilledReducer,
} from '@/../../src/redux/reducers/employee.reducers';
import { TypedActionCreator } from '@reduxjs/toolkit/dist/listenerMiddleware/types';

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

interface FindEmployeeByIdAction extends PayloadAction<string> {}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    findEmployeeById(state, action: FindEmployeeByIdAction) {
      console.log(state.employees, "action payloaddf**************")

      const result = state.employees.filter((item) => {
      console.log(item._id, action.payload, "action payloaddf**************")

        return item._id === action.payload;
      });
      return { ...state, employee: result[0] };
    },
    clearEmployee(state) {
      return { ...state, employee: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);
    builder.addCase(createEmployee.pending as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);
    builder.addCase(updateEmployee.pending  as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);
    builder.addCase(deleteEmployee.pending  as TypedActionCreator<string>, pendingReducer as CaseReducer<any>);

    builder.addCase(fetchAllEmployees.fulfilled  as TypedActionCreator<string>, fetchAllEmployeesFulfilledReducer as CaseReducer<any>);
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

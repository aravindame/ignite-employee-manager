
export interface Employee {
  _id: string;
  photo: string;
  name_img?: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
};

export interface State {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean | null;
  status: string | null;
  error: Error | null;
}

interface Action {
  type: string;
  payload?: any;
}

const statusTypes = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

/**
Reducer function for the pending state.
@function pendingReducer
@param {State} state - The current state.
@returns {State} - The updated state with pending status and loading set to true.
*/

export const pendingReducer = (state: State): State => {
  return { ...state, status: statusTypes.PENDING, loading: true };
};

/**
Reducer function for the rejected state.
@function rejectedReducer
@param {State} state - The current state.
@param {Action} action - The action containing the payload.
@returns {State} - The updated state with the error object, rejected status, and loading set to false.
*/
export const rejectedReducer = (state: State, action: Action): State => {
  return {
    ...state,
    error: action.payload,
    status: statusTypes.REJECTED,
    loading: false,
  };
};

/**  
Reducer function for the fulfilled state when fetching all employees.
@function fetchAllEmployeesFulfilledReducer
@param {State} state - The current state.
@param {Action} action - The action containing the payload.
@returns {State} - The updated state with fulfilled status, loading set to false, and the updated list of employees.
*/
export const fetchAllEmployeesFulfilledReducer = (
  state: State,
  action: Action
): State => {
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employees: action.payload,
  };
};

/**
Reducer function for the fulfilled state when creating an employee.
@function createEmployeeFulfilledReducer
@param {State} state - The current state.
@param {Action} action - The action containing the payload.
@returns {State} - The updated state with fulfilled status, loading set to false, and the updated list of employees.
*/
export const createEmployeeFulfilledReducer = (
  state: State,
  action: Action
): State => {
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employees: [...state.employees, action?.payload],
  };
};

/**
Reducer function for the fulfilled state when updating an employee.
@function updateEmployeeFulfilledReducer
@param {State} state - The current state.
@param {Action} action - The action containing the payload.
@returns {State} - The updated state with fulfilled status, loading set to false, the cleared selected employee, and the updated list of employees.
*/
export const updateEmployeeFulfilledReducer = (
  state: State,
  action: Action
): State => {

  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employee: null,
    employees: [
      ...state.employees.filter((item) => {
        return item._id !== action?.payload?._id;
      }),
      action?.payload,
    ],
  };
};

/**
Reducer function for the fulfilled state when deleting an employee.
@function deleteEmployeeFulfilledReducer
@param {State} state - The current state.
@param {Action} action - The action containing the payload.
@returns {State} - The updated state with fulfilled status, loading set to false, the cleared selected employee, and the updated list of employees.
*/
export const deleteEmployeeFulfilledReducer = (
  state: State,
  action: Action
): State => {
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employee: null,
    employees: [
      ...state.employees.filter((item) => {
        return item._id !== action?.payload;
      }),
    ],
  };
};


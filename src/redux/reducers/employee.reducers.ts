import { current } from "@reduxjs/toolkit";

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
  
  export const pendingReducer = (state: State): State => {
    return { ...state, status: statusTypes.PENDING, loading: true };
  };
  
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
  
  export const updateEmployeeFulfilledReducer = (
    state: State,
    action: Action
  ): State => {
    console.log(current(state),  action, "fetch all data");

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
  
  export const rejectedReducer = (state: State, action: Action): State => {
    return {
      ...state,
      error: action.payload,
      status: statusTypes.REJECTED,
      loading: false,
    };
  };
  
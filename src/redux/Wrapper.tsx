import React, { ReactNode, useEffect } from 'react';
import { fetchAllEmployees } from './actions/employee.actions';
import { store } from '@/../../src/redux/store';
import { Provider } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

/**
 * A wrapper component is used to provide the Redux store, which was necessary to
 * eliminate the integration issue between Redux and Next.js 13. This solution
 * can be considered a hack.
 *
 * @param {Object} props - The props for this component.
 * @param {Object} props.children - The child components to be wrapped.
 * @returns {React.ReactNode} - The wrapped child components with access to the Redux store.
 * @see https://github.com/vercel/next.js/issues/41994#issuecomment-1308810315
 */

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  useEffect(() => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = store.dispatch;
    dispatch(fetchAllEmployees('employee/fetchAll'));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

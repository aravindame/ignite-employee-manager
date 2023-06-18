"use client";

import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { EmployeeGridView } from '../../components/organisums/EmployeeGridView';
import { EmployeeButtonGroup } from '../../../src/components/molecules/EmployeeButtonGroup';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { EmployeeTable } from '../molecules/EmployeeTable';
import { MoonLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';

/**
 * Renders a list of employees with the option to switch between grid and table view.
 *
 * @component
 * @returns {JSX.Element} The rendered EmployeeList component.
 * @author Aravinda Meewalaarachchi
 */

interface Employee {
  _id: string;
  photo: string;
  name_img: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
}

interface RootState {
  employees: {
    employees: Employee[];
    loading: boolean;
  };
}

export default function EmployeeList(): JSX.Element {
  const { payload:{employees: data}, loading } = useSelector((state: RootState) => {
    return {
      payload: state?.employees,
      loading: state?.employees?.loading
    }
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  // switch to change the grid or list view
  const [gridView, setGridView] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (data && data.length !== 0) {
      setEmployees(data);
    }
  }, [data, gridView]);

  if(loading)
  return <MoonLoader color={theme?.palette?.primary?.main} size={100} cssOverride={{
    margin: '300px auto',
  }}/>;
  
  return (
    <React.Fragment>
      <CssBaseline />
      <ToastContainer position="top-right"
        autoClose={5000}
      />
      <EmployeeButtonGroup gridView={gridView} setGridView={setGridView} />
      <Container maxWidth='xl' sx={{ my: 8 }}>
        {gridView ? (
          <EmployeeGridView employees={employees} />
        ) : (
          <EmployeeTable employees={employees} />
        )}
      </Container>
    </React.Fragment>
  );
}

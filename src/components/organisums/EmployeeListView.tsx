"use client";

import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { EmployeeGridView } from '@/components/organisums/EmployeeGridView';
import { EmployeeButtonGroup } from '@/../../src/components/molecules/EmployeeButtonGroup';
import { useSelector } from 'react-redux';
import { EmployeeTable } from '../molecules/EmployeeTable';

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
  };
}

export default function EmployeeList(): JSX.Element {
  const { employees: data } = useSelector((state: RootState) => state?.employees);
  const [employees, setEmployees] = useState<Employee[]>([]);
  // switch to change the grid or list view
  const [gridView, setGridView] = useState(false);

  useEffect(() => {
    if (data && data.length !== 0) {
      setEmployees(data);
    }
  }, [data, gridView]);

  return (
    <React.Fragment>
      <CssBaseline />
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

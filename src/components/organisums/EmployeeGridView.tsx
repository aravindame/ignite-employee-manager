import React from 'react';
import Grid from '@mui/material/Grid';
import EmployeeCard from '@/../../src/components/molecules/EmployeeCard';

interface EmployeeGridViewProps {
  employees: Employee[];
}

interface Employee {
  _id: string;
  photo: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
}

export function EmployeeGridView({ employees }: EmployeeGridViewProps): JSX.Element {
  return (
    <Grid container spacing={6} justifyContent='flex-start' alignItems='flex-start'>
      {employees &&
        employees.map((employee: Employee) => {
          return <EmployeeCard key={employee._id} employee={employee} />;
        })}
    </Grid>
  );
}

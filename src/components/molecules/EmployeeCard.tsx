"use client";

import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '../atoms/Typography';
import { Tooltip } from '../atoms/Tooltip';
import { Avatar } from '../atoms/Avatar';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '@/redux/actions/employee.actions';
import { AnyAction } from 'redux';

/**
 * A component that renders a card for displaying employee information.
 *
 * @component
 * @param {EmployeeCardProps} props - The employee object for the EmployeeCard component.
 * @returns {JSX.Element} - The rendered EmployeeCard component.
 * @author Aravinda Meewalaarachchi
 */

interface EmployeeCardProps {
  employee: {
    _id: string;
    photo: string;
    first_name: string;
    last_name: string;
    email: string;
    number: string;
    gender: string;
  };
}

export default function EmployeeCard({ employee }: EmployeeCardProps): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEditEmployee = (employee: any) => {
    if (!employee?.id) return;
    
    //route to the employee edit page
    router.push(`/employee/edit/${employee._id}`);
  };
  return (
    employee && (
      <Grid item lg={12 / 5} xs={2} maxWidth={300} position={'relative'}>
        <Card>
          <Image
            priority={true}
            width={260}
            height={180}
            src={employee.photo}
            alt='img'
            className='img'
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box padding={2}>
              <Typography variant='text-card-info' text={`${employee.first_name} ${employee.last_name}`} />
              <Typography variant='text-card-info' textTransform={'lowercase'} text = {`${employee.email}`} /> 
              <Typography variant='text-card-info' textTransform={'lowercase'} text = {`${employee.number}`} />
              <Typography variant='text-card-info' text = {`${employee.gender}`} />
            </Box>
            <Box
              padding={2}
              display={'flex'}
              alignItems={'flex-start'}
              justifyContent={'flex-end'}
              position={'absolute'}
              ml={18}
              mt={6}
            >
              <Tooltip title={'Delete employee'}>
                <Avatar
                  styles={{
                    backgroundColor: theme?.palette?.error.main,
                    m: 0.5,
                    '&:hover': { opacity: 0.8 },
                    cursor: 'pointer',
                  }}
                  // delete employee click handler
                  onclick={() => {
                    dispatch(deleteEmployee(employee?._id) as unknown as AnyAction);
                  }}
                >
                  <DeleteIcon />
                </Avatar>
              </Tooltip>
              <Tooltip title={'Edit employee'}>
                <Avatar
                  styles={{
                    backgroundColor: theme?.palette?.success?.main,
                    m: 0.5,
                    '&:hover': { opacity: 0.8 },
                    cursor: 'pointer',
                  }}
                  onclick={() => handleEditEmployee(employee)}
                >
                  <EditIcon />
                </Avatar>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      </Grid>
    )
  );
}

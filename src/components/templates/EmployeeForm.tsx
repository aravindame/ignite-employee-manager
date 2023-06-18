"use client";

import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Paper,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Container
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import validationSchema from '../../util/employeeFormValidator';
import { camelToSnakeCase } from '../../util/camelToSnakeCase';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { Dropdown } from '../atoms/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Employee as EmployeeType, State } from '../../redux/reducers/employee.reducers';
import { findEmployeeById } from '../../redux/features/employeeSlice';
import { createEmployee, updateEmployee } from '../../redux/actions/employee.actions';
import { AnyAction } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * A component that is responsible for rendering the employee add or edit forms.
 * @component
 * @param {object} props - The component props.
 * @param {string} props.employeeId - The ID of the employee.
 * @returns {JSX.Element} The JSX element representing the EmployeeForm component.
 * @author Aravinda Meewalaarachchi
 */

type EmployeeFormProps = { employeeId?: string };
type Employee = EmployeeType | null;

export const EmployeeForm = ({ employeeId }: EmployeeFormProps): JSX.Element => {
  // default profile picture when employee photo is not present in payload
  const avatarImg: string = process.env.NEXT_PUBLIC_AVATAR_URL || '';

  // helper fields to generate the employee form fields dynamically
  const fields: Record<string, string> = useMemo(
    () => ({
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      number: 'Phone',
    }),
    [],
  );
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  // Yup validator initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { employee }: any = useSelector((state: State) => state?.employees);
  const [gender, setGender] = useState('Male');

  // fetch the employee by employeeID from store if it is a employee edit route.
  useEffect(() => {
    employeeId && dispatch(findEmployeeById(employeeId));
  }, [dispatch, employeeId]);

  // populate the retrieved data from the store if it is a employee edit route.
  useEffect(() => {
    employee &&
      Object.keys(fields).forEach((item: keyof Employee | string) => {
        setValue(item, (employee as any)[camelToSnakeCase(item)]);
      });
  }, [employee, fields, setValue]);

  /**
   * Handles the change event of the gender select input.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event.
   */

  const handleChange = (event: any) => {
    setGender(event.target.value);
  };

  /**
   * Handles the form submission.
   * @param {object} data - The form data.
   */
  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = { ...data };
    normalizePayload(formData, gender, employee, avatarImg);
    const mutatedData = { data: formData, employeeId: employeeId ?? "" };
    employeeId ? dispatch(updateEmployee(mutatedData) as unknown as AnyAction) : dispatch(createEmployee(formData) as unknown as AnyAction);

  };


  /**
   * Normalizes the payload data.
   * @param {object} data - The form data.
   * @param {string} gender - The selected gender.
   * @param {object} employee - The employee object.
   * @param {string} avatarImg - The URL of the default avatar.
 **/

  const normalizePayload = (data: any, gender: string, employee: any, avatarImg: string) => {
    data['gender'] = gender?.charAt(0).toUpperCase();
    if (data['photo'] === undefined) {
      data['photo'] = employee ? employee?.photo : avatarImg;
    }
    data['first_name'] = data['firstName'];
    data['last_name'] = data['lastName'];
    delete data.firstName;
    delete data.lastName;
  };

  return (
    <Fragment>
      <ToastContainer position="top-right"
        autoClose={5000}
      />
      <CssBaseline />
      <Container maxWidth='sm' sx={{ my: 8 }}>
        <Box display={'flex'} justifyContent='end'>
          <Button
            onclick={() => {
              router.push('/employee/list');
            }}
            variant='contained'
            styles={{ px: 6, my: 4, borderRadius: 6, fontWeight: 'bold' }}
          >
            List View
          </Button>
        </Box>
        <Paper sx={{ borderRadius: 4, border: 'groove #E7E9EB' }}>
          <Box px={4} py={2} my={2}>
            <Grid container spacing={1} justifyContent='center'>
              {Object.keys(fields)?.map((field) => {
                return (
                  <Grid key={field} item xs={12} display='block'>
                    <Box display={'flex'} alignItems='center'>
                      <Typography variant='customForm' width={120} text={`${fields[`${field}`]}`} />
                      <TextField
                        required
                        id={field}
                        fullWidth
                        margin='dense'
                        {...register(field)}
                        error={errors[`${field}`] ? true : false}
                      />
                    </Box>
                    <Typography variant='inherit' color='textSecondary' text={`${errors[`${field}`]?.message}`} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} display='block' mt={2}>
              <Box display={'flex'} alignItems='center'>
                <Typography id='gender' width={120} variant='inherit' text='Gender' />
                <Dropdown
                  list={['Male', 'Female']}
                  labelId='gender'
                  id='gender'
                  fullWidth
                  value={gender || ''}
                  onChange={handleChange}
                />
              </Box>
            </Grid>

            <Box mt={3} display='flex' justifyContent='flex-end'>
              <Button
                styles={{
                  backgroundColor: 'white',
                  border: `solid ${theme?.palette?.primary?.main}`,
                  fontWeight: 'bold',
                  color: `${theme?.palette?.primary?.main}`,
                  px: 5,
                  borderRadius: 2,
                  borderWidth: 'thin',
                }}
                onclick={handleSubmit(onSubmit)}
                text={employeeId ? 'Save' : 'Add'}
              >

              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};
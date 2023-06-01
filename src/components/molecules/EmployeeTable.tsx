"use client";

import * as React from 'react';
import { Palette, Theme, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '@/../../src/redux/actions/employee.actions';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { AnyAction } from '@reduxjs/toolkit';

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

interface EmployeeTableProps {
  employees?: Employee[];
}

interface CustomPalette extends Palette {
    tableCellHead: {
        background: string;
        boarder: string;
        button: string;
    }
}

const StyledTableCell = styled(TableCell)(({ theme })=> ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: (theme.palette as CustomPalette).tableCellHead.background,
    color: theme.palette.common.white,
    border: 'solid',
    borderColor: (theme.palette as CustomPalette).tableCellHead.boarder,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 'solid',
    borderColor: (theme.palette as CustomPalette).tableCellHead.boarder,
  },
}));

export function EmployeeTable({ employees }: EmployeeTableProps): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  if(employees && employees?.length ===0 ) return <></>;
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1600 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant='table-data' text='Image' />
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data' text='First Name' />
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data' text='Last Name' />
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data' text='Email'/>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data' text='Phone' />
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data' text='Gender' />
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data' text='Actions' />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { employees?.map((row) => (
            <TableRow key={row.email}>
              <StyledTableCell  align='center' width={80} height={80}>
                <Image src={row.photo} alt={`${row.name_img}`} width={60} height={60} />
              </StyledTableCell>
              <StyledTableCell component='th' scope='row' align='left'>
                <Typography variant='table-data' text= {`${row.first_name}`} />
              </StyledTableCell>
              <StyledTableCell component='th' scope='row' align='left'>
                <Typography variant='table-data' text= {`${row.last_name}`} />
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data' text = {`${row.email}`} textTransform={'lowercase'} />
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data' text={`${row.number}`} />
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data' text={`${row.gender}`} />
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data'>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                      variant='contained'
                      styles={{
                        borderRadius: 1,
                        p: 1,
                        backgroundColor: (theme.palette as CustomPalette).tableCellHead?.button,
                        '&:hover': {
                          backgroundColor: (theme.palette as CustomPalette).tableCellHead?.button,
                          opacity: 7,
                        },
                      }}
                      //route to the employee edit page
                      onclick={() => router.push(`/employee/edit/${row._id}`)}
                    >
                      Edit
                    </Button>
                    <Avatar
                      styles={{
                        backgroundColor: theme?.palette?.common?.white,
                        color: (theme.palette as any).primary?.error,
                        m: 2,
                        '&:hover': {
                          backgroundColor: (theme.palette as any).secondary?.btnBackground,
                          boxShadow: 10,
                          cursor: 'pointer',
                        },
                      }}
                      // delete the selected employee
                      onclick={() => dispatch(deleteEmployee(row._id) as unknown as AnyAction)}
                    >
                      <DeleteIcon sx={{ fontSize: 48 }} />
                    </Avatar>
                  </Box>
                </Typography>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

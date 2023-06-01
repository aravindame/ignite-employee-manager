import EmployeeModel from '@/../../src/models/employee';
import { Employee } from '@/redux/reducers/employee.reducers';
import { schemaValidator } from '@/util/employeeSchemaValidator';
import { ObjectId, Document } from 'mongoose';

type QueryResults = Employee & { _id: ObjectId; _doc?: Document<any, any, any>; } | null;

const validator = schemaValidator();

export async function listAllEmployees(): Promise<Employee[]> {
  return await EmployeeModel.find({});
}


export async function addEmployee(body: Employee): Promise<QueryResults> {
  const error = validateBeforeAddOrUpdate(body);
  if (error) {
    throw error;
  }
return await EmployeeModel.create(body);
}

export async function updateEmployee(body: Employee, employeeId: string|undefined| string[]): Promise<QueryResults> {

  // Validate the request body
  const error = validateBeforeAddOrUpdate(body);
  if (error) {
    throw error;
  }

  const employee = await EmployeeModel.findById(employeeId);

  if (!employee) {
    throw new Error('Invalid employee ID.');
  }

  return await EmployeeModel.findByIdAndUpdate(employeeId, body, { new: true });
}

export async function deleteEmployee(employeeId:string | string[] | undefined) {
  const employee = await EmployeeModel.findByIdAndRemove(employeeId);

  if (!employee) {
    throw new Error('Invalid employee ID.');
  }

  return employee;
}


export function validateBeforeAddOrUpdate(body:Employee) {
  const { error } = validator(body);

  if (error) {
    return new Error(error.details[0].message);
  }

  return;
}

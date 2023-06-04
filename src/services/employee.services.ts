import EmployeeModel from '../models/employee';
import { Employee } from '@/redux/reducers/employee.reducers';
import { schemaValidator } from '@/util/employeeSchemaValidator';
import { ObjectId, Document } from 'mongoose';

/**
 * A Service that handles Business logic for CRUD operations employee API routes.
 *
 * @author Aravinda Meewalaarachchi
 */

type QueryResults = Employee & { _id: ObjectId; _doc?: Document<any, any, any>; } | null;

const validator = schemaValidator();

/**

Represents the list of all employees.
@async
@function listAllEmployees
@returns {Promise<Employee[]>} - The list of all employees.
*/
export async function listAllEmployees(): Promise<Employee[]> {
  return await EmployeeModel.find({});
}

/**

Adds an employee.
@async
@function addEmployee
@param {Employee} body - The employee object to be added.
@returns {Promise<QueryResults>} - The query results.
@throws {Error} - If there is an error during the validation process.
*/
export async function addEmployee(body: Employee): Promise<QueryResults> {
  const error = validateBeforeAddOrUpdate(body);
  if (error) {
    throw error;
  }
  return await EmployeeModel.create(body);
}

/**

Updates an employee.
@async
@function updateEmployee
@param {Employee} body - The updated employee object.
@param {string | undefined | string[]} employeeId - The ID of the employee to be updated.
@returns {Promise<QueryResults>} - The query results.
@throws {Error} - If there is an error during the validation process or the employee ID is invalid.
*/
export async function updateEmployee(body: Employee, employeeId: string | undefined | string[]): Promise<QueryResults> {

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

/**

Deletes an employee.
@async
@function deleteEmployee
@param {string | string[] | undefined} employeeId - The ID of the employee to be deleted.
@returns {Promise<void>} - A promise that resolves when the employee is deleted.
@throws {Error} - If the employee ID is invalid.
*/
export async function deleteEmployee(employeeId: string | string[] | undefined) {

  const employee = await EmployeeModel.findById(employeeId);

  if (!employee) {
    throw new Error('Invalid employee ID.');
  }

  return await EmployeeModel.findByIdAndRemove(employeeId);
}

/**

Validates an employee before adding or updating.
@function validateBeforeAddOrUpdate
@param {Employee} body - The employee object to be validated.
@returns {Error | undefined} - An error object if validation fails, or undefined if validation passes.
*/
export function validateBeforeAddOrUpdate(body: Employee) {
  const { error } = validator(body);

  if (error) {
    return new Error(error.details[0].message);
  }

  return;
}

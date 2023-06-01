import EmployeeModel from '@/../../src/models/employee';
import { Employee } from '@/redux/reducers/employee.reducers';
import { addEmployee, deleteEmployee, listAllEmployees, updateEmployee } from '@/services/employee.services';
import { schemaValidator } from '@/util/employeeSchemaValidator';
import { ObjectId, Document } from 'mongoose';
import { NextApiResponse, NextApiRequest } from "next";

/**
 * Handles requests for GET and POST employee API routes.
 *
 * @author Aravinda Meewalaarachchi
 */

type QueryResults = Employee & { _id: ObjectId; _doc?: Document<any, any, any>; } | null;

/**
 * Handles requests to list all employees.
 *
 * @async
 * @function listAllEmployeeHandler
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */
export async function listAllEmployeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const employees: Employee[] = await listAllEmployees();
  res.status(200).json({ employees });
}

/**
 * Handles requests to add a new employee.
 *
 * @async
 * @function addEmployeeHandler
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */
export async function addEmployeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const employee: QueryResults = await addEmployee(body);
  res.status(201).json({ ...employee?._doc });
}

/**
 * Handles PUT requests to update an employee by ID.
 *
 * @async
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If there is an error with the request body or the employee ID is invalid.
 * @returns {Promise<void>} A Promise that resolves when the function has completed executing.
 */
export async function updateEmployeeHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body,
    query: { employeeId },
  } = req;
  const result: QueryResults = await updateEmployee(body, employeeId);
  res.status(201).json({ ...result?._doc });
}

/**
 * Handles DELETE requests to remove an employee by ID.
 *
 * @async
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If the employee ID is invalid.
 * @returns {Promise<void>} A Promise that resolves when the function has completed executing.
 */
export async function deleteEmployeeHandler(req: NextApiRequest, res: NextApiResponse) {
  await deleteEmployee(req?.query?.employeeId);
  res.status(204);
}

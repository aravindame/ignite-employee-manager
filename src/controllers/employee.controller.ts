
import { Employee } from '@/redux/reducers/employee.reducers';
import { addEmployee, deleteEmployee, listAllEmployees, updateEmployee } from '@/services/employee.services';
import { ObjectId, Document } from 'mongoose';
import { NextApiResponse, NextApiRequest } from "next";

/**
 * A controller that handles CRUD operations requests for employee API routes.
 * @Author Aravinda Meewalaarachchi
 */

type QueryResults = Employee & { _id: ObjectId; _doc?: Document<any, any, any>; } | null;

/**
 * Handles requests to list all employees.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the function has completed executing.
 */
export async function listAllEmployeeHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const employees: Employee[] = await listAllEmployees();
  res.status(200).json({ employees });
}

/**
 * Handles requests to add a new employee.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the function has completed executing.
 */
export async function addEmployeeHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { body } = req;
  const employee: QueryResults = await addEmployee(body);
  res.status(201).json({ ...employee?._doc });
}

/**
 * Handles PUT requests to update an employee by ID.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the function has completed executing.
 */
export async function updateEmployeeHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    body,
    query: { employeeId },
  } = req;
  const result: QueryResults = await updateEmployee(body, employeeId);
  if (result) {
    res.status(201).json({ ...result?._doc });
  } else {
    res.status(404).json({ error: 'Employee not found.' });
  }
}

/**
 * Handles DELETE requests to remove an employee by ID.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the function has completed executing.
 */
export async function deleteEmployeeHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await deleteEmployee(req?.query?.employeeId);
  res.status(204).send({});
}

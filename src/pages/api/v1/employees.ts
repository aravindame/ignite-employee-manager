import connection from '@/../../src/database/db.connection';
import { addEmployeeHandler, listAllEmployeeHandler } from '@/controllers/employee.controller';
import { safeExecutionHandler } from '@/util/safeExecutionHandler';
import { NextApiResponse, NextApiRequest } from "next";
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import authHandler from '@/util/authHandler';

/**
 * Handles incoming requests for the employee API.
 *
 * @async
 * @function handler
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  //Authenticate the incoming request.
  await safeExecutionHandler(authHandler, req, res);
  // Make sure that the database connection is safe to use before handling the request.
  await safeExecutionHandler(connection, req, res, { statusCode: 500 });
  // Handle the request based on the HTTP method.
  switch (req?.method) {
    case 'GET': {
      await safeExecutionHandler(listAllEmployeeHandler, req, res);
      break;
    }
    case 'POST': {
      await safeExecutionHandler(addEmployeeHandler, req, res);
      break;
    }
    default: {
      res.status(400).json({ message: 'Bad Request!' });
    }
  }
}

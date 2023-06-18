
import connection from '@/../../src/database/db.connection';
import { deleteEmployeeHandler, updateEmployeeHandler } from '@/controllers/employee.controller';
import authHandler from '@/util/authHandler';
import { safeExecutionHandler } from '@/util/safeExecutionHandler';
import { NextApiResponse, NextApiRequest } from "next";

/**
 * Handles GET and POST requests to /api/employee route.
 * @author Aravinda Meewalaarachchi
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} A Promise that resolves when the request has been handled.
 */
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    //Authenticate the incoming request.
  await safeExecutionHandler(authHandler, req, res);
  await safeExecutionHandler(connection, req, res, { statusCode: 500 });

  switch (req?.method) {
    case 'PUT': {
      await safeExecutionHandler(updateEmployeeHandler, req, res);
      break;
    }
    case 'DELETE': {
      await safeExecutionHandler(deleteEmployeeHandler, req, res);
      break;
    }
    default: {
      res.status(400).json({ message: 'Bad request!' });
    }
  }
}

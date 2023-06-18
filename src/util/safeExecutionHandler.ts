import { NextApiResponse, NextApiRequest } from "next";
import * as Sentry from '@sentry/nextjs';

interface CustomErrorResponse {
  statusCode?: number;
  message?: string;
}

/**
 * Handles safe execution of an asynchronous function by catching any errors and returning a standardized response.
 *
 * @async
 * @function safeExecutionHandler
 * @param {Function} exec - The asynchronous function to be executed.
 * @param {NextApiRequest} req - The HTTP request object
 * @param {NextApiResponse} res - The HTTP response object
 * @param {CustomErrorResponse} [_error={ statusCode: 400, message: 'Bad Request' }] - Optional object that specifies a custom error response to send back to the client if an error occurs.
 *     @param {number} [_error.statusCode=400] - The status code to use for the error response. Defaults to 400.
 *     @param {string} [_error.message='Bad Request'] - The message to use for the error response. Defaults to 'Bad Request'.
 * @returns {Promise<void>} A Promise that resolves when the function has completed executing.
 */

export async function safeExecutionHandler(
  exec: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  req: NextApiRequest,
  res: NextApiResponse,
  _error: CustomErrorResponse = { statusCode: 400, message: 'Bad Request' }
): Promise<void> {
  // Check if _error is a valid object, and if not, assign a default value.
  if (typeof _error !== 'object' || !_error.statusCode || !_error.message) {
    _error = { statusCode: 400, message: 'Bad Request' };
  }
  try {
    // Execute the provided function with the given request and response objects.
    await exec(req, res);
    
  } catch (error:any) {
    Sentry.captureException(error);
    // Send back an error response with the specified status code and message.
    res
      .status(error?.statusCode || _error?.statusCode)
      .json({ message: error?.message || _error?.message });
  }
}

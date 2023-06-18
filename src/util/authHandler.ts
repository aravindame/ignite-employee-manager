import { NextApiResponse, NextApiRequest } from "next";
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

/**
Authenticate incoming requests for the employee API.
@async
@param {NextApiRequest} req - The HTTP request object.
@param {NextApiResponse} res - The HTTP response object.
@returns {Promise<void>} A Promise that resolves when the function has completed executing.
*/
export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session)
        res.status(401).json({ message: 'You must be logged in.' });
}
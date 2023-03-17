import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, validateUserPassword } from './userValidation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await findUserByEmail(email);

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isValidPassword = await validateUserPassword(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Send the user data or a success message when the login is successful
            return res.status(200).json({ message: 'User logged in successfully', user });

        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

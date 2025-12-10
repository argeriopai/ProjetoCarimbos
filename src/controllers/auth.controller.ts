import { Request, Response} from 'express';
import * as AuthService from '../services/auth.service';

export const login = async (request: Request, response: Response) => {
    const data = request.body;
    try {
        const result = await AuthService.login(data);
        return response.json(result);
    } catch (error: any) {
        return response.status(401).json({ message: error.message })
    }
}
import { SignIn } from '@/src/types';
import { api } from './api.service';

export const signIn = async (data: SignIn): Promise<string> => {
    return api.post("/api/auth/sign-in", data)
        .then((res) => {
            return res.data
        });
}

export const ValidateToken = async (token: string): Promise<string> => {
    return api.get(`/api/auth/validate?token=${token}`)
        .then((res) => {
            return res.data
        });
}
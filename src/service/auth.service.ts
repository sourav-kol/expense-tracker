import { SignIn } from '@/src/types';
import { api } from './api.service';

export const signIn = async (data: SignIn): Promise<string> => {
    return api.post("/api/auth/sign-in", data)
        .then((res) => {
            return res.data
        });
}
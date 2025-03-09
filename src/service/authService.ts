import { SignIn } from '@/src/types';
import axios from 'axios';

export const signIn = async (data: SignIn): Promise<string> => {
    return axios.post("/api/auth/sign-in", data)
        .then((res) => {
            return res.data
        });
}
import axios from 'axios';
import { Response } from '@/Database/mongodb';

export const getExpenses = async (): Promise<Response> => {
    return axios.get("/api/expenses")
        .then((res) => {
            return res.data
        });
}
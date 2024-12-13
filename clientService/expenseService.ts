import { Expense } from '@/types';
import axios from 'axios';

export const getExpenses = async (): Promise<any> => { //todo: fix return type
    return axios.get("/api/expenses")
        .then((res) => {
            return res.data
        });
}

export const getExpenseById = async (id: String): Promise<Expense> => { //todo: fix return type
    return axios.get("/api/expenses/" + id)
        .then((res) => {
            return res.data;
        });
}

export const createExpenses = async (body: Expense): Promise<any> => { //todo: fix return type
    return axios.post("/api/expenses", body)
        .then((res) => {
            return res.data;
        });
}
import { Expense, Paged, Pagination } from '@/src/types';
import { api } from './apiService';

export const getExpenses = async (pagination:Pagination): Promise<Paged<Expense>> => { //todo: fix return type
    return api.get("/api/expenses"+`?page=${pagination.page}&pageSize=${pagination.pageSize}`)
        .then((res) => {
            return res.data
        });
}

export const getExpenseById = async (id: String): Promise<Expense> => { //todo: fix return type
    return api.get("/api/expenses/" + id)
        .then((res) => {
            return res.data;
        });
}

export const createExpenses = async (body: Expense): Promise<any> => { //todo: fix return type
    return api.post("/api/expenses", body)
        .then((res) => {
            return res.data;
        });
}
import { Expense, Paged, Pagination, WeeklyExpenseSummary } from '@/src/types';
import { api } from './api.service';

export const getExpenses = async (pagination:Pagination): Promise<Paged<Expense>> => { //todo: fix return type
    return api.get("/api/expenses"+`?page=${pagination.page}&pageSize=${pagination.pageSize}`)
        .then((res) => {
            return res.data
        });
}

export const getWeeklyGroupedExpenses = async (): Promise<WeeklyExpenseSummary[]> => { //todo: fix return type
    return api.post("/api/expenses/grouped")
        .then((res) => {
            console.log(res);
            return res.data
        });
}

export const getExpenseById = async (id: String): Promise<Expense> => { //todo: fix return type
    console.log("Fetching expense with id:", id);
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
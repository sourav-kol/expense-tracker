import axios from 'axios';

export const getExpenses = async (): Promise<any> => { //todo: fix return type
    return axios.get("/api/expenses")
        .then((res) => {
            return res.data
        });
}
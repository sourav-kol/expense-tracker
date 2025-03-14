import { DashBoard, DashBoardFilter } from '@/src/types';
import { api } from './api.service';

export const getDashboardDetails = async (filter: DashBoardFilter): Promise<DashBoard> => {
    // axios.post("/api/expenses/email", {});
    return api.post("/api/dashboard", filter)
        .then((res) => {
            return res.data
        });
}

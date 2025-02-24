import { DashBoard, DashBoardFilter } from '@/src/types';
import axios from 'axios';

export const getDashboardDetails = async (filter: DashBoardFilter): Promise<DashBoard> => {
    return axios.post("/api/dashboard", filter)
        .then((res) => {
            return res.data
        });
}

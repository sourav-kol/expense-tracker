import { ChartData, DashBoard, DashBoardFilter } from '@/src/types';
import { api } from './api.service';

export const getDashboardDetails = async (filter: DashBoardFilter): Promise<DashBoard> => {
    return api.post("/api/dashboard", filter)
        .then((res) => {
            return res.data
        });
}


export const getDashboardChartData = async (filter: DashBoardFilter): Promise<ChartData[]> => {
    return api.post("/api/dashboard/charts", filter)
        .then((res) => {
            return res.data
        });
}

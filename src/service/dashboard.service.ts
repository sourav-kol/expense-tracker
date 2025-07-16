import { DonutChartData, DashBoard, DashBoardFilter, BarChartData } from '@/src/types';
import { api } from './api.service';

export const getDashboardDetails = async (filter: DashBoardFilter): Promise<DashBoard> => {
    return api.post("/api/dashboard", filter)
        .then((res) => {
            return res.data
        });
}


export const getDashboardChartData = async (filter: DashBoardFilter): Promise<DonutChartData[]> => {
    return api.post("/api/dashboard/charts", filter)
        .then((res) => {
            return res.data
        });
}

export const getDashboardBarChartData = async (filter: DashBoardFilter): Promise<BarChartData[]> => {
    return api.post("/api/dashboard/barchart", filter)
        .then((res) => {
            return res.data
        });
}

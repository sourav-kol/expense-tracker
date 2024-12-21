import { NavItems, Pagination } from "@/types";

export const Nav = () => {
    return {
        Items: [
            {
                Key: "/dashboard",
                Label: "Dashboard"
            },
            {
                Key: "/expense",
                Label: "Expense"
            },
            {
                Key: "/report",
                Label: "Report"
            },
        ]
    } as NavItems
}

export const DefaultPaginationValue: Pagination = {
    page: 1,
    pageSize: 5
}

export const DefaultCategory:Record<string, string> = {
    "1": 'Food',
    "2": 'Shopping',
    "3": 'Bills',
    "4": 'Entertainment',
}
import { NavItems, Pagination } from "@/src/types";

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
            // {
            //     Key: "/report",
            //     Label: "Report"
            // },
        ]
    } as NavItems
}

export const DefaultPaginationValue: Pagination = {
    page: 1,
    pageSize: 75
}

export const DefaultCategory:Record<string, string> = {
    "1": 'Food',
    "2": 'Shopping',
    "3": 'Bills',
    "4": 'Entertainment',
}

export const Months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
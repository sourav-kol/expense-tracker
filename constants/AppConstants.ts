import { NavItems } from "@/types";

export const Nav = () => {
    return {
        Items: [
            {
                Key:"/dashboard",
                Label:"Dashboard"
            },
            {
                Key:"/expense",
                Label:"Expense"
            },
            {
                Key:"/report",
                Label:"Report"
            },
        ]
    }as NavItems
}

export const DefaultPaginationValue = {
        page: 0,
        pageSize: 7
} 
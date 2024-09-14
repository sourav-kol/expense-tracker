import { NavItems } from "@/types";

export const Nav = () => {
    return {
        Items: [
            {
                Key:"/dashboard",
                Label:"Dashboard"
            },
            {
                Key:"/report",
                Label:"Report"
            },
            {
                Key:"/expense",
                Label:"Expense"
            }
        ]
    }as NavItems
}
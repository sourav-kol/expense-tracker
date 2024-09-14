import { NavItems } from "@/types";

export const Nav = () => {
    return {
        Items: [
            {
                Key:"/publish",
                Label:"Publish"
            },
            {
                Key:"/publish/preview",
                Label:"Preview"
            }
        ]
    }as NavItems
}
export type Blog = {
    Icon: number,
    Title: string,
    ShortDescription: string,
    PublishedDate: string,
    Likes: number,
    Shares: number
}

export type NavItem = {
    Key: string,
    Label: string
}

export type NavItems = {
    Items: NavItem[]
}

export type Expense = {
    id: number,
    title: string,
    category: Category,
    date: string, //todo: change to date type
    amount: number
}

export enum Category {
    Food = 1,
    Shopping,
    Bills,
    Entertainment
}

export type Pagination = {
    page: number,
    pageSize: number,
    totalCount?: number
}
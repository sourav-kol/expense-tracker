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
    category: Category | string, //todo: fix this
    date: string, //todo: change to date type
    amount: number,
    createdDate: string,
    notes: string
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
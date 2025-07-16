// export type Blog = {
//     Icon: number,
//     Title: string,
//     ShortDescription: string,
//     PublishedDate: string,
//     Likes: number,
//     Shares: number
// }

export type NavItem = {
    Key: string,
    Label: string
}

export type NavItems = {
    Items: NavItem[]
}

export type Expense = {
    _id: String,
    title: string,
    category: Category | string, //todo: fix this
    // date: string, //todo: change to date type
    amount: number,
    createdDate: string,
    notes?: string
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
}

export type Paged<T> = {
    data: T[],
    total: number
}

export type DashBoard = {
    totalExpense?: string,
    currentMonthExpense: number,
}

export type DashBoardFilter = {
    startDate: Date,
    endDate: Date
}

export type SignIn = {
    code: string
}

export type DonutChartData = {
    part: string,
    category: string,
    totalAmount?: number
}

export type BarChartData = {
    month: string,
    totalAmount?: number
}
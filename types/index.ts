export type Blog  = {
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
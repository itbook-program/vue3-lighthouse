export interface PostArticle {
    user: string,
    cover: string,
    title: string,
    content?: string,
    type: number
}

export interface ArticleCtx {
    currentPage?: number,
    pageSize?: number,
    type?: number,
    cover?: string,
    content?: any,
    title?: string,
    uid?: any
}

export interface ArticleList {
    _id?: string,
    title?: string,
    type?: number,
    user?: string,
    cover?: string,
    content?: any,
    updatedAt?: Date
}
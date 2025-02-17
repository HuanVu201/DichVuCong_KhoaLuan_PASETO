export interface IPaginationResponse<T> {
    data: T,
    currentPage: number,
    totalPages: number,
    totalCount:number,
    pageSize: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}
export interface IError{
    message: string
}

export interface IResult<T> {
    data: T,
    failed: boolean,
    message: string,
    succeeded: boolean,
}
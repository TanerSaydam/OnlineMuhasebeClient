export class PaginationResultModel<T>{
    datas: T;
    pageNumber: number = 1;
    pageSize: number = 5;
    totalPages: number;
    isFirstPage: boolean = true;
    isLastPage: boolean = false;
}
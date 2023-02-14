export class RequestModel{
    companyId: string = "";
    pageNumber: number = 1;
    pageSize: number = 5;
    year: number = new Date().getFullYear()
}
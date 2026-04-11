export class CommonResponseModal<T> {
    Message: string;
    Status: string;
    Data: T;
    ListData: T[];

    constructor(message: string, status: string, data: T, listData: T[]) {
        this.Message = message;
        this.Status = status;
        this.Data = data;
        this.ListData = listData;
    }

}
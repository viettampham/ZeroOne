export class GetNhanVienRequest{
    PageIndex: number;
    PageSize: number;

    constructor(PageIndex: number, PageSize: number) {
        this.PageIndex = PageIndex;
        this.PageSize = PageSize;
    }
}
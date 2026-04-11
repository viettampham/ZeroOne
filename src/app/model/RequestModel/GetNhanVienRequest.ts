export class GetNhanVienRequest{
    PageIndex: number;
    PageSize: number;
    Keyword: string;

    constructor(PageIndex: number, PageSize: number, Keyword: string) {
        this.PageIndex = PageIndex;
        this.PageSize = PageSize;
        this.Keyword = Keyword;
    }
}
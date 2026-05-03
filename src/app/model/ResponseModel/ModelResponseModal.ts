export class ModelResponseModal{
    id: number;
    item: string;
    tenModel: string;
    loaiModel: string;
    khsxFileName: string;
    constructor(Id: number, Item: string, TenModel: string, LoaiModel: string, KhsxFileName: string) {
        this.id = Id;
        this.item = Item;
        this.tenModel = TenModel;
        this.loaiModel = LoaiModel;
        this.khsxFileName = KhsxFileName;
    }
}
export class MayResponseModal{
    id: number;
    tenMay: string;
    tenCongDoan: string;
    khuVuc: string;
    ghiChu: string 
    constructor(Id: number, TenMay: string, TenCongDoan: string, KhuVuc: string, GhiChu: string) {
        this.id = Id;
        this.tenMay = TenMay;
        this.tenCongDoan = TenCongDoan;
        this.khuVuc = KhuVuc;
        this.ghiChu = GhiChu;
    }
}
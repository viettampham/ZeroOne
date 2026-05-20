export class CongDoanResponse{
    id: number;
    tenCongDoan: string;
    ghiChu: string;
    khuVuc: string;
    constructor(Id: number, TenCongDoan: string, GhiChu: string, KhuVuc: string) {
        this.id = Id;
        this.tenCongDoan = TenCongDoan;
        this.ghiChu = GhiChu;
        this.khuVuc = KhuVuc;
    }
}
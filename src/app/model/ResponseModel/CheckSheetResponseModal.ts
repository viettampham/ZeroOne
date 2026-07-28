export class CheckSheetResponseModal {
    id: number;
    tenCheckSheet: string;
    tenCongDoan: string;
    khuVuc: string;
    tenMay: string;
    loaiCheckSheet: string;
    ghiChu: string;
    checkBy: string;
    path: string;
    constructor(Id: number, TenCheckSheet: string, TenCongDoan: string, KhuVuc: string, TenMay: string, LoaiCheckSheet: string, GhiChu: string, CheckBy: string, Path: string) {
        this.id = Id;
        this.tenCheckSheet = TenCheckSheet;
        this.tenCongDoan = TenCongDoan;
        this.khuVuc = KhuVuc;
        this.tenMay = TenMay;
        this.loaiCheckSheet = LoaiCheckSheet;
        this.ghiChu = GhiChu;
        this.checkBy = CheckBy;
        this.path = Path;
    }
}
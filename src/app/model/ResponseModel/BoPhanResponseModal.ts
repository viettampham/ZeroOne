export class BoPhanResponseModal {
    id: number;
    tenPhongBan: string;
    ghiChu: string;
    constructor(id: number, tenPhongBan: string, ghiChu: string) {
        this.id = id;
        this.tenPhongBan = tenPhongBan;
        this.ghiChu = ghiChu;
    }
}
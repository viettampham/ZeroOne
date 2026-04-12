export class KhuVucResponseModal {
    id: number;
    tenKhuVuc: string;
    ghiChu: string;
    tenBoPhan: string;
    constructor(id: number, tenKhuVuc: string, ghiChu: string, tenBoPhan: string) {
        this.id = id;
        this.tenKhuVuc = tenKhuVuc;
        this.ghiChu = ghiChu;
        this.tenBoPhan = tenBoPhan;
    }
}
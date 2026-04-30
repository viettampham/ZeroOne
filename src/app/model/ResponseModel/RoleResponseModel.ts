export class RoleResponseModel {
    id: number;
    capBac: string;
    ghiChu: string;
    quyen: number;

    constructor(id: number, capBac: string, ghiChu: string, quyen: number) {
        this.id = id;
        this.capBac = capBac;
        this.ghiChu = ghiChu;
        this.quyen = quyen;
    }
}
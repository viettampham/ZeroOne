export class NhanVienResponse {
    id: number;
    code: string;
    userName: string;
    isActive: boolean;
    isDelete: boolean;
    boPhan: string;
    ghiChu: string;
    khuVuc: string;
    role: number;
    constructor(Id: number, Code: string, UserName: string, IsActive: boolean, GhiChu: string, BoPhan: string, IsDelete: boolean,  KhuVuc: string, Role: number) {
        this.id = Id;
        this.code = Code;
        this.userName = UserName;
        this.isActive = IsActive;
        this.ghiChu = GhiChu;
        this.boPhan = BoPhan;
        this.isDelete = IsDelete;
        this.khuVuc = KhuVuc;
        this.role = Role;
    }
}
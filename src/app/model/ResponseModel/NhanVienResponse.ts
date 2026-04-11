export class NhanVienResponse {
    id: number;
    code: string;
    userName: string;
    password: string;
    isActive: boolean;
    isDelete: boolean;
    boPhan: string;
    ghiChu: string;
    constructor(Id: number, Code: string, UserName: string, IsActive: boolean, GhiChu: string, BoPhan: string, IsDelete: boolean, Password: string) {
        this.id = Id;
        this.code = Code;
        this.userName = UserName;
        this.isActive = IsActive;
        this.ghiChu = GhiChu;
        this.password = Password;
        this.boPhan = BoPhan;
        this.isDelete = IsDelete;
    }
}
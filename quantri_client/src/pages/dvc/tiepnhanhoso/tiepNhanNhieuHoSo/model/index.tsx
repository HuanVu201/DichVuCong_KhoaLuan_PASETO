export interface ITiepNhanNhieuHoSoParams {
    ids: string[],
    tenGiayTo: string
    maLoaiPhieu: string
    loaiPhoi: string
    code: string
}


export interface ITiepNhanNhieuHoSoResponse {
    data: ITiepNhanNhieuHoSo
}
export interface ITiepNhanNhieuHoSo {
    urlPhoi?: string
    idQrCode?: string
    tenTinh?: string
    hoSos: ITiepNhanNhieuHoSoElement[];
}
export interface ITiepNhanNhieuHoSoElement {
    id: string,
    maHoSo: string,
    chuHoSo: string,
    soDinhDanh: string,
    donViId: string,
    diaChiChuHoSo: string,
    soDienThoaiChuHoSo: string,
    emailChuHoSo: string,
    soGiayToChuHoSo: string,
    trichYeuHoSo: string,
    kenhThucHien: string,
    soBoHoSo: string,
    dangKyNhanHoSoQuaBCCIData: string,
    ngayNopHoSo: string,
    ngayTiepNhan: string,
    ngayHenTra: string,
    thoiGianThucHien: number,
    loaiThoiGianThucHien: string,
    nguoiTiepNhan: string,
    nguoiNopHoSo: string,
    groupName: string,
    catalog: string,
    maDinhDanh: string,
    uyQuyen: boolean,
    nguoiUyQuyen: string,
    diaChiNguoiUyQuyen: string,
    soDienThoaiNguoiUyQuyen: string,
    emailNguoiUyQuyen: string,
    soGiayToNguoiUyQuyen: string,
    maTTHC: string,
    soDienThoaiDonVi: string,
    maTinh: string,
    tenTinh: string,
}